import { User } from '@application/entities/user.entity';
import { instanceToInstance } from 'class-transformer';

export class UserMapper {
  static toDto({ id, name, email, created_at, updated_at }: User) {
    const user = instanceToInstance({
      id,
      name,
      email,
      created_at,
      updated_at,
    });

    return user;
  }
}
