import 'reflect-metadata';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('Authenticate User', () => {
    it('should be able to authenticate user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUserService = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

        const user = await createUserService.execute({
            name: "Marcus Vinicius",
            email: "5ucr4m@gmail.com",
            password: "123456"
        })

        const response = await authenticateUserService.execute({
            email: "5ucr4m@gmail.com",
            password: "123456"
        })

        expect(user).toHaveProperty('id');
        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    })

    it('should be able to authenticate with non existing user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUserService = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

        expect(authenticateUserService.execute({
            email: "5ucr4m2@gmail.com",
            password: "123456"
        })).rejects.toBeInstanceOf(AppError);

    })

    it('should be able to authenticate user with a worng password', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUserService = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

        await createUserService.execute({
            name: "Marcus Vinicius",
            email: "5ucr4m3@gmail.com",
            password: "asdqwe123"
        })

        expect(authenticateUserService.execute({
            email: "5ucr4m3@gmail.com",
            password: "123456"
        })).rejects.toBeInstanceOf(AppError);

    })

})