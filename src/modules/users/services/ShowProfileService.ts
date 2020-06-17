import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User> {
        const user = await this.userRepository.findByID(user_id);

        if (!user) {
            throw new AppError('User not found!!');
        }

        return user;
    }
}

export default ShowProfileService;
