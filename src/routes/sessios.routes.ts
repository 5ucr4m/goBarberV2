import { Router } from 'express';

import AuthenticateUserService from '../service/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    const { email, password } = request.body;
    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({
        email,
        password,
    });
    return response.json({ user, token });
});

export default usersRouter;
