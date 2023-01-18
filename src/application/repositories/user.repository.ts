import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract find(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(createUserDto: CreateUserDto): Promise<User>;
}
