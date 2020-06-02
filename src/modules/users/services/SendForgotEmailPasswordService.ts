import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/Users';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
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
    ) {}

    public async execute({ email }: IRequest): Promise<void> { 
        this.mailProvider.sendMail(email, "Pedido de recuperação de Senha recebido");
    }
}

export default SendForgotEmailPasswordService;
