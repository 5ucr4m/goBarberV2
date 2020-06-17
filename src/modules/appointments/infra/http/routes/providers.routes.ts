import { Router } from 'express';

import AuthMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(AuthMiddleware);

providersRouter.get('/', providersController.index);

export default providersRouter;
