import { Router } from 'express';

import AuthMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import AppointmentController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(AuthMiddleware);

appointmentsRouter.get('/', async (request, response) => {});

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
