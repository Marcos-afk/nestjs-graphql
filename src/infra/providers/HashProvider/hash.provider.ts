import { Injectable } from '@nestjs/common';
import { HashProviderProps } from './types/hash.provider';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class HashProvider implements HashProviderProps {
  async hash(password: string): Promise<string> {
    return await hash(password, 8);
  }

  async compare(password: string, password_compared: string): Promise<boolean> {
    return await compare(password, password_compared);
  }
}
