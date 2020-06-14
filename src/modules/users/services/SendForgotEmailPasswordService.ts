import { injectable, inject } from 'tsyringe';
import path from 'path';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
// import AppError from '@shared/errors/AppError';


interface IRequest {
    email: string;
}

@injectable()
class SendForgotEmailPasswordService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokenRepository: IUserTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> { 
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const { token } = await this.userTokenRepository.generate(user.id);

        const forgotPasswordTemaplte = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs' )

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            }, 
            subject: "[GoBarber] Recuperação de senha",
            templateData: {
                file: forgotPasswordTemaplte,
                variables: { 
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token}`
                }
            }
        });
    }
}

export default SendForgotEmailPasswordService;
