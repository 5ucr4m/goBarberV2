import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkUsersExists = await this.userRepository.findByEmail(email);

        if (checkUsersExists) {
            throw new AppError('Email is already exists!!');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        delete user.password;

        return user;
    }
}

export default CreateUserService;
