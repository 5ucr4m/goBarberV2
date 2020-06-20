import { Router } from 'express';

import AuthMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const PproviderDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.use(AuthMiddleware);

providersRouter.get('/', providersController.index);
providersRouter.get(
    '/:provider_id/day-availability',
    PproviderDayAvailabilityController.index,
);
providersRouter.get(
    '/:provider_id/month-availability',
    providerMonthAvailabilityController.index,
);

export default providersRouter;
