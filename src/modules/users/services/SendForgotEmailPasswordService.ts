import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/Users';
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
        private userTokensRepository: IUserTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> { 
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError('User does not exists');
        }

        await this.userTokensRepository.generate(user.id);

        this.mailProvider.sendMail(email, "Pedido de recuperação de Senha recebido");
    }
}

export default SendForgotEmailPasswordService;
