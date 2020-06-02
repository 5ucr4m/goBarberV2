import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import SendForgotEmailPasswordService from './SendForgotEmailPasswordService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fake/FakeMailProvider';

describe('Send Forgot User Password Email', () => {
    it('should be able to recovery the password using the email', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeMailProvider = new FakeMailProvider();
        const sendForgotEmailPasswordService = new SendForgotEmailPasswordService(fakeUserRepository, fakeMailProvider);

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

})