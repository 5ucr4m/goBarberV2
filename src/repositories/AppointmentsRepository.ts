import { Repository, EntityRepository } from 'typeorm';

import Appointment from '../models/Appointments';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findedAppointment = await this.findOne({
            where: { date },
        });

        return findedAppointment || null;
    }
}

export default AppointmentsRepository;
