import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';

import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}

    public async execute({ user_id, name, email, old_password, password }: IRequest): Promise<User> {
        const user = await this.userRepository.findByID(user_id);

        if (!user) {
            throw new AppError('User not found!!');
        }

        const anotherUser = await this.userRepository.findByEmail(email);

        if (anotherUser && anotherUser.id !== user_id) {
            throw new AppError('This email already used!!');
        }

        if (password) {
            if (!old_password) {
                throw new AppError('You need to provider old password!!');
            }

            const samePassword = await this.hashProvider.compareHash(old_password, user.password);

            if (!samePassword) {
                throw new AppError('You old password are wrong!!');
            }

            user.password = await this.hashProvider.generateHash(password);
        }
        
        user.name = name;
        user.email = email;

        return this.userRepository.save(user);

    }
}

export default UpdateProfileService;
