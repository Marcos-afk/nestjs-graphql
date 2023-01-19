import { FindUserByIdDto } from '@application/dtos/find-user-by-id.dto';
import { UserRepository } from '@application/repositories/user.repository';
import { NotFoundError } from '@common/errors/types/not-found-error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: FindUserByIdDto) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    await this.userRepository.remove(user);
    return true;
  }
}
