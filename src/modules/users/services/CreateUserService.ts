import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        
        @inject('hashProvider')
        private hashProvider: IHashProvider
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkUsersExists = await this.userRepository.findByEmail(email);

        if (checkUsersExists) {
            throw new AppError('Email is already exists!!');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
