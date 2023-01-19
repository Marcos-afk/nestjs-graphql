import { FindUserByIdDto } from '@application/dtos/find-user-by-id.dto';
import { UpdateUserDto } from '@application/dtos/update-user.dto';
import { UserMapper } from '@application/mappers/user.mapper';
import { UserRepository } from '@application/repositories/user.repository';
import { BadRequestError } from '@common/errors/types/bad-request-error';
import { NotFoundError } from '@common/errors/types/not-found-error';
import { HashProviderProps } from '@infra/providers/HashProvider/types/hash.provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProviderProps,
  ) {}

  async execute(
    { id }: FindUserByIdDto,
    { name, email, password }: UpdateUserDto,
  ) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    if (email) {
      const emailAlreadyExists = await this.userRepository.findByEmail(email);
      if (emailAlreadyExists && emailAlreadyExists.id !== id) {
        throw new BadRequestError('Email inválido');
      }
    }

    if (password) {
      const passwordCompared = await this.hashProvider.compare(
        password,
        user.password,
      );

      if (passwordCompared) {
        throw new BadRequestError('Senha nova não pode ser igual a antiga');
      }

      const hashPassword = await this.hashProvider.hash(password);
      user.password = hashPassword;
    }

    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await this.userRepository.update(user);
    return UserMapper.toDto(updatedUser);
  }
}
