import 'reflect-metadata';

import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import AppError from '@shared/errors/AppError';

let createAppointmentService: CreateAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository);
    });

    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointmentService.execute({
            date: new Date(),
            provider_id: '123123'
        })

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123');
    })

    it('should not be able to create two appointments on the same time', async () => {
        const date = new Date(2020, 5, 10, 11);

        await createAppointmentService.execute({
            date,
            provider_id: '123123'
        })

        expect(createAppointmentService.execute({
            date,
            provider_id: '123123'
        })).rejects.toBeInstanceOf(AppError);

    })
})