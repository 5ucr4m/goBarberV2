import 'reflect-metadata';

import FakeUserRepository from '@modules/users/repositories/fake/FakeUserRepository';
import ListProvidersService from './ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('Update Profile', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProvidersService = new ListProvidersService(
            fakeUserRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUserRepository.create({
            email: '5ucr4m1@gmail.com',
            name: 'Marcus 1',
            password: '123456',
        });

        const user2 = await fakeUserRepository.create({
            email: '5ucr4m2@gmail.com',
            name: 'Marcus 2',
            password: '123456',
        });

        const user3 = await fakeUserRepository.create({
            email: '5ucr4m3@gmail.com',
            name: 'Marcus 3',
            password: '123456',
        });

        const loggedUser = await fakeUserRepository.create({
            email: '5ucr4m4@gmail.com',
            name: 'Marcus 4',
            password: '123456',
        });

        const providers = await listProvidersService.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2, user3]);
    });
});
