import { UserRepositoryInMemory } from '@application/in-memory/user.repository-in-memory';
import { NotFoundError } from '@common/errors/types/not-found-error';
import { DeleteUserUseCase } from './DeleteUserUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let deleteUserUseCase: DeleteUserUseCase;

describe('Delete user use case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    deleteUserUseCase = new DeleteUserUseCase(userRepositoryInMemory);
  });

  it('should be able to delete a user', async () => {
    const user = await userRepositoryInMemory.create({
      name: 'Marcos André',
      email: 'marcosteste123@gmail.com',
      password: '12345678',
    });

    const response = await deleteUserUseCase.execute({ id: user.id });
    expect(response).toBe(true);
  });

  it('should not be able to delete a user, user not found', async () => {
    expect(
      deleteUserUseCase.execute({ id: '1122620e-3018-4a22-b6a9-170b0ff45f86' }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
