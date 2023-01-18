import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRepository } from '@application/repositories/user.repository';
import { User } from '@application/entities/user.entity';
import { CreateUserDto } from '@application/dtos/create-user.dto';

@Injectable()
export class TypeormUsersRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async find(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({ ...createUserDto });
    await this.usersRepository.save(user);
    return user;
  }
}