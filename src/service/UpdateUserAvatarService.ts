import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/Users';

import AppError from '../errors/AppError';

interface Request {
    user_id: string;
    filename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, filename }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);

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
        await userRepository.save(user);

        delete user.password;
        return user;
    }
}

export default UpdateUserAvatarService;
