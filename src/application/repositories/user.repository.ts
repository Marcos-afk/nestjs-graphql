import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract find(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract update(user: User): Promise<User>;
  abstract remove(user: User): Promise<void>;
}
