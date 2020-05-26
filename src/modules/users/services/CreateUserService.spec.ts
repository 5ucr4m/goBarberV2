import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('Create User', () => {
    it('should be able to create a new user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

        const user = await createUserService.execute({
            email: "5ucr4m@gmail.com",
            name: "Marcus Vinicius",
            password: "123456"
        })

        expect(user).toHaveProperty('id');
    })

    it('should not be able to create two users with a same email', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

        await createUserService.execute({
            email: "5ucr4m@gmail.com",
            name: "Marcus Vinicius",
            password: "123456"
        })

        expect(createUserService.execute({
            email: "5ucr4m@gmail.com",
            name: "John Doe",
            password: "123456"
        })).rejects.toBeInstanceOf(AppError);

    })
})