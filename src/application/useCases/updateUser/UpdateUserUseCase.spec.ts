import { FakeHashProvider } from '@application/fakes/fake-hash.provider';
import { UserRepositoryInMemory } from '@application/in-memory/user.repository-in-memory';
import { BadRequestError } from '@common/errors/types/bad-request-error';
import { NotFoundError } from '@common/errors/types/not-found-error';
import { UpdateUserUseCase } from './UpdateUserUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let updateUserUseCase: UpdateUserUseCase;
let hashProvider: FakeHashProvider;

describe('Update user use case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    hashProvider = new FakeHashProvider();
    updateUserUseCase = new UpdateUserUseCase(
      userRepositoryInMemory,
      hashProvider,
    );
  });

  it('should be able to update a user', async () => {
    const userCreated = await userRepositoryInMemory.create({
      name: 'Marcos André',
      email: 'marcosteste123@gmail.com',
      password: '12345678',
    });

    const user = await updateUserUseCase.execute(
      { id: userCreated.id },
      { email: 'email@test.com' },
    );

    expect(user.email).toEqual('email@test.com');
  });

  it('should not be able to update a user, user not found', async () => {
    expect(
      updateUserUseCase.execute(
        { id: '1122620e-3018-4a22-b6a9-170b0ff45f86' },
        { email: 'email@test.com' },
      ),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should not be able to update a user, old password cannot be the same as new', async () => {
    const userCreated = await userRepositoryInMemory.create({
      name: 'Marcos André',
      email: 'marcosteste123@gmail.com',
      password: '12345678',
    });

    expect(
      updateUserUseCase.execute(
        { id: userCreated.id },
        { password: '12345678' },
      ),
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it('should not be able to update user, email already exists', async () => {
    await userRepositoryInMemory.create({
      name: 'Marcos André',
      email: 'marcosteste123@gmail.com',
      password: '12345678',
    });

    const userCreated = await userRepositoryInMemory.create({
      name: 'Marcos Melo',
      email: 'marcos@gmail.com',
      password: '12345678',
    });

    expect(
      updateUserUseCase.execute(
        { id: userCreated.id },
        { email: 'marcosteste123@gmail.com' },
      ),
    ).rejects.toBeInstanceOf(BadRequestError);
  });
});
