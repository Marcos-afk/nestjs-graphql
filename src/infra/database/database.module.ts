import { User } from '@application/entities/user.entity';
import { UserRepository } from '@application/repositories/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfigs } from './typeorm/config/TypeormConfig';
import { TypeormUsersRepository } from './typeorm/repositories/typeorm-user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfigs),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeormUsersRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
