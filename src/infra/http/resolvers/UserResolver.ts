import { CreateUserDto } from '@application/dtos/create-user.dto';
import { User } from '@application/entities/user.entity';
import { CreateUserUseCase } from '@application/useCases/createUser/CreateUserUseCase';
import { FindAllUsersUseCase } from '@application/useCases/findAllUsers/FindAllUsersUseCase';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
  ) {}

  @Query(() => [User])
  async find() {
    return await this.findAllUsersUseCase.execute();
  }

  @Mutation(() => User)
  async create(@Args('createUserDto') createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto);
  }
}
