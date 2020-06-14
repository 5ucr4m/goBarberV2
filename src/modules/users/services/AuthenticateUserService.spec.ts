import 'reflect-metadata';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

describe('Authenticate User', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        authenticateUserService = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
        createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
    })
    it('should be able to authenticate user', async () => {
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
        expect(authenticateUserService.execute({
            email: "5ucr4m2@gmail.com",
            password: "123456"
        })).rejects.toBeInstanceOf(AppError);

    })

    it('should be able to authenticate user with a worng password', async () => {
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