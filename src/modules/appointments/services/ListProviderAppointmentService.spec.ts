import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentService from './ListProviderAppointmentService';
import AppError from '@shared/errors/AppError';

let listProviderAppointmentService: ListProviderAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('List Provider Appointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderAppointmentService = new ListProviderAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list the appointments on a specific day', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'me',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'me',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });

        const appointments = await listProviderAppointmentService.execute({
            provider_id: 'provider',
            year: 2020,
            month: 5,
            day: 20,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
