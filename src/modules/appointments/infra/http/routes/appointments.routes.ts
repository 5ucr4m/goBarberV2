import { Router } from 'express';

import AuthMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import AppointmentController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(AuthMiddleware);

appointmentsRouter.post('/', appointmentController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
