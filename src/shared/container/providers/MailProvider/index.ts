import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import EtherealEmailProvider from './implementations/EtherealEmailProvider';
import SESEmailProvider from './implementations/SESEmailProvider';

import IMailProvider from './models/IMailProvider';

const providers = {
    ethereal: container.resolve(EtherealEmailProvider),
    ses: container.resolve(SESEmailProvider),
};

container.registerInstance<IMailProvider>(
    'MailProvider',
    providers[mailConfig.driver],
);
