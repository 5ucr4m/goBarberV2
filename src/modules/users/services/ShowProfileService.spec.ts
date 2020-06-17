import 'reflect-metadata';

import ShowProfileService from './ShowProfileService';
import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('Update Profile', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();

        showProfileService = new ShowProfileService(
            fakeUserRepository, 
        );
    });

    it('should be able to show profile', async () => {
        const user = await fakeUserRepository.create({
            email: "5ucr4m@gmail.com",
            name: "Marcus",
            password: "123456"
        });

        const profile = await showProfileService.execute({ user_id: user.id });

        expect(profile.email).toBe("5ucr4m@gmail.com");
        expect(profile.name).toBe("Marcus");

    });

    it('should not be able to show profile an non-existing user', async () => {
        
        await expect(
            showProfileService.execute(
                { user_id: 'no-existing-user-id' }
            )
        ).rejects.toBeInstanceOf(AppError);

    })

})