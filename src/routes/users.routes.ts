import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import AuthMiddleware from '../middlewares/ensureAuthenticate';

import CreateUserRepository from '../service/CreateUserService';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);
const createUserRepository = new CreateUserRepository();

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const user = await createUserRepository.execute({
        name,
        email,
        password,
    });
    return response.json(user);
});

usersRouter.patch(
    '/avatar',
    AuthMiddleware,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService();

        const { id: user_id } = request.user;
        const { filename } = request.file;
        const user = await updateUserAvatar.execute({
            user_id,
            filename,
        });
        return response.json(user);
    },
);

export default usersRouter;
