import 'reflect-metadata';

import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fake/FakeDiskStorageProvider';
import AppError from '@shared/errors/AppError';

describe('Update User Avatar', () => {
    it('should be able to update a user avatar', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeDiskStorageProvider = new FakeDiskStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUserRepository, 
            fakeDiskStorageProvider
        );

        const user = await fakeUserRepository.create({
            email: "5ucr4m@gmail.com",
            name: "Marcus Vinicius",
            password: "123456"
        })

        await updateUserAvatarService.execute({
            user_id: user.id,
            filename: 'avatar.jpg'
        })

        expect(user.avatar).toBe('avatar.jpg');
    })

    it('should not be able to update a user avatar from non existing user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeDiskStorageProvider = new FakeDiskStorageProvider();

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUserRepository, 
            fakeDiskStorageProvider
        );

        expect(updateUserAvatarService.execute({
            user_id: "1234123",
            filename: 'avatar.jpg'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should delete old avatar when update new one', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeDiskStorageProvider = new FakeDiskStorageProvider();

        const deleteFile = jest.spyOn(fakeDiskStorageProvider, 'deleteFile');

        const updateUserAvatarService = new UpdateUserAvatarService(
            fakeUserRepository, 
            fakeDiskStorageProvider
        );

        const user = await fakeUserRepository.create({
            email: "5ucr4m@gmail.com",
            name: "Marcus Vinicius",
            password: "123456"
        })

        await updateUserAvatarService.execute({
            user_id: user.id,
            filename: 'avatar.jpg'
        })

        await updateUserAvatarService.execute({
            user_id: user.id,
            filename: 'avatar2.jpg'
        })

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    })

})