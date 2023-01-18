import { CreateUserDto } from '@application/dtos/create-user.dto';
import { FindUserByIdDto } from '@application/dtos/find-user-by-id.dto';
import { User } from '@application/entities/user.entity';
import { CreateUserUseCase } from '@application/useCases/createUser/CreateUserUseCase';
import { FindAllUsersUseCase } from '@application/useCases/findAllUsers/FindAllUsersUseCase';
import { FindUserByIdUseCase } from '@application/useCases/findUserById/FindUserByIdUseCase';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  @Query(() => [User])
  async find() {
    return await this.findAllUsersUseCase.execute();
  }

  @Query(() => User)
  async findById(@Args('findUserByIdDto') findUserByIdDto: FindUserByIdDto) {
    return await this.findUserByIdUseCase.execute(findUserByIdDto);
  }

  @Mutation(() => User)
  async create(@Args('createUserDto') createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto);
  }
}
