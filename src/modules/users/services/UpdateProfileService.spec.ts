import 'reflect-metadata';

import UpdateProfileService from './UpdateProfileService';
import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('Update Profile', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfileService = new UpdateProfileService(
            fakeUserRepository, 
            fakeHashProvider
        );
    });

    it('should be able to update a profile', async () => {
        const user = await fakeUserRepository.create({
            email: "5ucr4m@gmail.com",
            name: "Marcus",
            password: "123456"
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            email: "5ucr4m2@gmail.com",
            name: "Vinicius",
        });

        expect(updatedUser.email).toBe("5ucr4m2@gmail.com");
        expect(updatedUser.name).toBe("Vinicius");
    })

    it('should not be able to show profile an non-existing user', async () => {
        
        await expect(
            updateProfileService.execute({
                user_id: 'no-existing-user-id',
                name: "Vinicius",
                email: "fulano@email.com"
            })
        ).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to update a email used for another user', async () => {
        const user = await fakeUserRepository.create({
            email: "5ucr4m@gmail.com",
            name: "Vinicius",
            password: "123456"
        });

        await fakeUserRepository.create({
            email: "5ucr4m2@gmail.com",
            name: "Marcus",
            password: "123456"
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            email: "5ucr4m2@gmail.com",
            name: "Vinicius",
            password: "123456"
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update a password', async () => {
        const user = await fakeUserRepository.create({
            email: "5ucr4m@gmail.com",
            name: "Marcus",
            password: "123456"
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            email: "5ucr4m2@gmail.com",
            name: "Vinicius",
            old_password: '123456',
            password: "123123"
        });

        expect(updatedUser.password).toBe("123123");
    });

    it('should not be able to update a password without old password', async () => {
        const user = await fakeUserRepository.create({
            email: "5ucr4m@gmail.com",
            name: "Marcus",
            password: "123456"
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            email: "5ucr4m2@gmail.com",
            name: "Vinicius",
            password: "123123"
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a password without a wrong old password', async () => {
        const user = await fakeUserRepository.create({
            email: "5ucr4m@gmail.com",
            name: "Marcus",
            password: "123456"
        });

        await expect(updateProfileService.execute({
            user_id: user.id,
            email: "5ucr4m2@gmail.com",
            name: "Vinicius",
            old_password: 'wrong-old-password',
            password: "123123"
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update a password', async () => {
        const user = await fakeUserRepository.create({
            email: "5ucr4m@gmail.com",
            name: "Marcus",
            password: "123456"
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            email: "5ucr4m2@gmail.com",
            name: "Vinicius",
            old_password: '123456',
            password: "123123"
        });

        expect(updatedUser.password).toBe('123123');
    });

})