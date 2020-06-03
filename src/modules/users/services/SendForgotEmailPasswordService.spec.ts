import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import SendForgotEmailPasswordService from './SendForgotEmailPasswordService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fake/FakeMailProvider';
import FakeUsersTokensRepository from '../repositories/fake/FakeUserTokensRepository';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let sendForgotEmailPasswordService: SendForgotEmailPasswordService;


describe('Send Forgot User Password Email', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUsersTokensRepository = new FakeUsersTokensRepository();

        sendForgotEmailPasswordService = new SendForgotEmailPasswordService(
            fakeUserRepository,
            fakeMailProvider,
            fakeUsersTokensRepository
        );
    });

    it('should be able to recovery the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        const user = await fakeUserRepository.create({
            email: "5ucr4m@gmail.com",
            name: "Marcus Vinicius",
            password: "123456"
        })

        await sendForgotEmailPasswordService.execute({
            email: "5ucr4m@gmail.com",
        })

        expect(sendMail).toHaveBeenCalled();
    })

    it('should not be able recover a non-existing user password', async () => {
        await expect(
            sendForgotEmailPasswordService.execute({
                email: "5ucr4m@gmail.com",
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        const generateToken = jest.spyOn(fakeUsersTokensRepository, 'generate');

        const user = await fakeUserRepository.create({
            email: "5ucr4m@gmail.com",
            name: "Marcus Vinicius",
            password: "123456"
        })

        await sendForgotEmailPasswordService.execute({
            email: "5ucr4m@gmail.com",
        })

        expect(sendMail).toHaveBeenCalled();
        expect(generateToken).toHaveBeenCalledWith(user.id);
    });

})
