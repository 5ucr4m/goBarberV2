import { Router } from 'express';

import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';
import sessionRoutes from './sessios.routes';

const router = Router();

router.get('/', (request, response) => {
    response.json('Welcome');
});

router.use('/session', sessionRoutes);
router.use('/users', usersRoutes);
router.use('/appointments', appointmentsRoutes);

export default router;
