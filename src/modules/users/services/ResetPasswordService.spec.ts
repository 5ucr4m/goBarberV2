import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import FakeUsersTokensRepository from '../repositories/fake/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;


describe('Reset Password Service', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeUsersTokensRepository = new FakeUsersTokensRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPasswordService = new ResetPasswordService(
            fakeUserRepository,
            fakeUsersTokensRepository,
            fakeHashProvider
        );
    });

    it('should be able to reset password', async () => {
        const user = await fakeUserRepository.create({
            email: "5ucr4m@gmail.com",
            name: "Marcus Vinicius",
            password: "123456"
        })

        const { token } = await fakeUsersTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPasswordService.execute({
            token,
            password: '123123',
        })

        const updatedUser = await fakeUserRepository.findByID(user.id);
        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
    })

    it('should not be able to reset password with non-existing token', async () => {
        await expect(resetPasswordService.execute({
            token: 'non-existing token',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to reset password with non-existing user', async () => {
        const { token } = await fakeUsersTokensRepository.generate('non-existing-user');
        await expect(resetPasswordService.execute({
            token: 'non-existing-token',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to reset password with passed more than 2 hours', async () => {
        const user = await fakeUserRepository.create({
            email: "5ucr4m@gmail.com",
            name: "Marcus Vinicius",
            password: "123456"
        })

        const userToken = await fakeUsersTokensRepository.generate(user.id);

        const { token } = userToken;

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate= new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPasswordService.execute({
                token,
                password: '123123',
            })
        ).rejects.toBeInstanceOf(AppError);
    })

})
