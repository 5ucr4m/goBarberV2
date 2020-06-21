import { Router } from 'express';

import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRoutes from '@modules/appointments/infra/http/routes/providers.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionRoutes from '@modules/users/infra/http/routes/session.routes';
import passwordsRoutes from '@modules/users/infra/http/routes/password.routes';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';

const router = Router();

router.get('/', (request, response) => {
    response.json('Welcome');
});

router.use('/appointments', appointmentsRoutes);
router.use('/users', usersRoutes);
router.use('/session', sessionRoutes);
router.use('/password', passwordsRoutes);
router.use('/profile', profileRoutes);
router.use('/providers', providersRoutes);

export default router;
