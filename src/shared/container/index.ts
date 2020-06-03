import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

// import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
// import iUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

// container.registerSingleton<IUserTokensRepository>('UserTokensRepository', IUserTokensRepository);