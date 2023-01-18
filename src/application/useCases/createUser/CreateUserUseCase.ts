import { CreateUserDto } from '@application/dtos/create-user.dto';
import { UserRepository } from '@application/repositories/user.repository';
import { BadRequestError } from '@common/errors/types/bad-request-error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ name, email, password, confirm_password }: CreateUserDto) {
    const emailAlreadyExists = await this.userRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw new BadRequestError('Email inválido');
    }

    if (password !== confirm_password) {
      throw new BadRequestError('Senhas não conferem');
    }

    const user = await this.userRepository.create({
      name,
      email,
      password,
      confirm_password,
    });

    return user;
  }
}
