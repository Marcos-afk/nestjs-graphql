/*import { CreateUserDto } from '@application/dtos/create-user.dto';
import { User } from '@application/entities/user.entity';
import { UserRepository } from '@application/repositories/user.repository';

export class UserRepositoryInMemory implements UserRepository {
  private users: User[] = [];

  async find(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user ? user : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user ? user : null;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, {
      
    });
  }

  async update(user: User): Promise<User> {}

  async remove(user: User): Promise<void> {}
}
*/
