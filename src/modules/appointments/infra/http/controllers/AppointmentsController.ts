import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
    // public async index(request: Request, response: Response): Promise<Response> {
    //     const appointments = await appointmentsRepository.find();
    //     return response.json(appointments);
    // }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date } = request.body;
        const { id: user_id } = request.user;

        const createAppointmentService = container.resolve(
            CreateAppointmentService,
        );

        const appointment = await createAppointmentService.execute({
            provider_id,
            user_id,
            date,
        });

        return response.json(appointment);
    }
}
