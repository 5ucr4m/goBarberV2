import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';


interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> { 
        const userToken = await this.userTokensRepository.findByToken(token);
        
        if (!userToken) {
            throw new AppError('User token do not exists');
        }

        const user = await this.userRepository.findByID(userToken.user_id);
        if (!user) {
            throw new AppError('User do not exists');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);


        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }

        user.password = await this.hashProvider.generateHash(password);
        await this.userRepository.save(user);
    }
}

export default ResetPasswordService;
