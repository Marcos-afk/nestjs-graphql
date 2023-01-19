import { UserRepositoryInMemory } from '@application/in-memory/user.repository-in-memory';
import { FindAllUsersUseCase } from './FindAllUsersUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let findAllUsersUseCase: FindAllUsersUseCase;

describe('Find all users use case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    findAllUsersUseCase = new FindAllUsersUseCase(userRepositoryInMemory);
  });

  it('should be able to return all users', async () => {
    await userRepositoryInMemory.create({
      name: 'Marcos André',
      email: 'marcosteste123@gmail.com',
      password: '12345678',
    });

    await userRepositoryInMemory.create({
      name: 'Marcos André',
      email: 'marcosteste1234@gmail.com',
      password: '12345678',
    });

    const users = await findAllUsersUseCase.execute();
    expect(users).toHaveLength(2);
  });
});
