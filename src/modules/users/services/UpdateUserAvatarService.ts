import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';


import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
    user_id: string;
    filename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    public async execute({ user_id, filename }: IRequest): Promise<User> {
        const user = await this.userRepository.findByID(user_id);

        if (!user) {
            throw new AppError('User not found!!');
        }

        if (user.avatar) {
            const avatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const avatarFilePathExists = await fs.promises.stat(avatarFilePath);

            if (avatarFilePathExists) {
                await fs.promises.unlink(avatarFilePath);
            }
        }

        user.avatar = filename;
        await this.userRepository.save(user);

        delete user.password;
        return user;
    }
}

export default UpdateUserAvatarService;
