import { FakeHashProvider } from '@application/fakes/fake-hash.provider';
import { UserRepositoryInMemory } from '@application/in-memory/user.repository-in-memory';
import { BadRequestError } from '@common/errors/types/bad-request-error';
import { CreateUserUseCase } from './CreateUserUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let hashProvider: FakeHashProvider;

describe('Create user use case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    hashProvider = new FakeHashProvider();
    createUserUseCase = new CreateUserUseCase(
      userRepositoryInMemory,
      hashProvider,
    );
  });

  it('should be able to create  a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Marcos André',
      email: 'marcosteste123@gmail.com',
      password: '12345678',
    });

    expect(user).toHaveProperty('id');
    expect(user.id).not.toBeNull();
  });

  it('should not be able to create a new user, email already exists', async () => {
    await userRepositoryInMemory.create({
      name: 'Marcos André',
      email: 'marcosteste123@gmail.com',
      password: '12345678',
    });

    expect(
      createUserUseCase.execute({
        name: 'Marcos André',
        email: 'marcosteste123@gmail.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(BadRequestError);
  });
});
