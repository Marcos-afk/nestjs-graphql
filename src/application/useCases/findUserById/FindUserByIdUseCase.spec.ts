import { UserRepositoryInMemory } from '@application/in-memory/user.repository-in-memory';
import { NotFoundError } from '@common/errors/types/not-found-error';
import { FindUserByIdUseCase } from './FindUserByIdUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let findUserByIdUseCase: FindUserByIdUseCase;

describe('Find user by id use case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    findUserByIdUseCase = new FindUserByIdUseCase(userRepositoryInMemory);
  });

  it('should be able to find a user by id', async () => {
    const userCreated = await userRepositoryInMemory.create({
      name: 'Marcos André',
      email: 'marcosteste123@gmail.com',
      password: '12345678',
    });

    const user = await findUserByIdUseCase.execute({ id: userCreated.id });
    expect(user).toHaveProperty('id');
    expect(user).not.toHaveProperty('password');
  });

  it('should not be able to find a user by id, user not found', async () => {
    expect(
      findUserByIdUseCase.execute({
        id: '1122620e-3018-4a22-b6a9-170b0ff45f86',
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
