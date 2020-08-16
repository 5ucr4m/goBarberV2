import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User[]> {
        const cacheKey = `providers-list:${user_id}`;
        let users = await this.cacheProvider.recover<User[]>(cacheKey);

        if (!users) {
            users = await this.userRepository.findAllProviders({
                except_user_id: user_id,
            });

            await this.cacheProvider.save(cacheKey, classToClass(users));
        }

        if (!users) {
            throw new AppError('User not found!!');
        }

        return users;
    }
}

export default ListProvidersService;
