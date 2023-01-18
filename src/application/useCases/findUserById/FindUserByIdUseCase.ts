import { FindUserByIdDto } from '@application/dtos/find-user-by-id.dto';
import { UserMapper } from '@application/mappers/user.mapper';
import { UserRepository } from '@application/repositories/user.repository';
import { NotFoundError } from '@common/errors/types/not-found-error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: FindUserByIdDto) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return UserMapper.toDto(user);
  }
}
