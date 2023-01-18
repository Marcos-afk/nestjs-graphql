import { UserMapper } from '@application/mappers/user.mapper';
import { UserRepository } from '@application/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.find();
    return users.map((user) => UserMapper.toDto(user));
  }
}
