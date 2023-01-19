import { CreateUserDto } from '@application/dtos/create-user.dto';
import { UserMapper } from '@application/mappers/user.mapper';
import { UserRepository } from '@application/repositories/user.repository';
import { BadRequestError } from '@common/errors/types/bad-request-error';
import { HashProviderProps } from '@infra/providers/HashProvider/types/hash.provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProviderProps,
  ) {}

  async execute({ name, email, password }: CreateUserDto) {
    const emailAlreadyExists = await this.userRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw new BadRequestError('Email inválido');
    }

    const hashPassword = await this.hashProvider.hash(password);
    const user = await this.userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return UserMapper.toDto(user);
  }
}
