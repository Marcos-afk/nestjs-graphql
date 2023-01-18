import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfigs } from './typeorm/config/TypeormConfig';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfigs)],
})
export class DatabasesModule {}
