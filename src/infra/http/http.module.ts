import { CreateUserUseCase } from '@application/useCases/createUser/CreateUserUseCase';
import { DatabaseModule } from '@infra/database/database.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './resolvers/UserResolver';
import { join } from 'path';
import { FindAllUsersUseCase } from '@application/useCases/findAllUsers/FindAllUsersUseCase';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/infra/http/schema.gql'),
      sortSchema: true,
    }),
  ],
  providers: [CreateUserUseCase, FindAllUsersUseCase, UserResolver],
})
export class HttpModule {}
