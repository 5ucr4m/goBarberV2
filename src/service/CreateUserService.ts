import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/Users';
import AppError from '../errors/AppError';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const checkUsersExists = await userRepository.findOne({
            where: { email },
        });

        if (checkUsersExists) {
            throw new AppError('Email is already exists!!');
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepository.save(user);

        delete user.password;

        return user;
    }
}

export default CreateUserService;
