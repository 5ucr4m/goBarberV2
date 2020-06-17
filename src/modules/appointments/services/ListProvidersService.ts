import { injectable, inject } from 'tsyringe';

import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User[]> {
        const users = await this.userRepository.findAllProviders({ except_user_id: user_id });

        if (!users) {
            throw new AppError('User not found!!');
        }

        return users;
    }
}

export default ListProvidersService;
