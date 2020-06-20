import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
        day,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                provider_id,
                year,
                month,
                day,
            },
        );

        const hourStart = 8;

        const eacHourArray = Array.from(
            { length: 10 },
            (_, index) => index + hourStart,
        );

        const currentDate = new Date(Date.now());
        const availability = eacHourArray.map(hour => {
            const hasAppointmentsInHour = appointments.find(appointment => {
                return getHours(appointment.date) === hour;
            });

            const compareDate = new Date(year, month - 1, day, hour);

            return {
                hour,
                available:
                    !hasAppointmentsInHour && isAfter(compareDate, currentDate),
            };
        });

        return availability;
    }
}

export default ListProviderMonthAvailabilityService;
