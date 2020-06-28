import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const uploadDir = path.resolve(__dirname, '..', '..', 'uploads');

interface IUploadConfig {
    driver: 's3' | 'disk';

    temp: string;
    directory: string;

    multer: {
        storage: StorageEngine;
    };

    config: {
        disk: {};
        aws: {
            bucket: string;
        };
    };
}

export default {
    driver: process.env.STORAGE_DRIVER,
    temp: uploadDir,
    directory: path.resolve(uploadDir, 'Files'),
    config: {
        disk: {},
        aws: {
            bucket: '5dev-gobarber',
        },
    },
    multer: {
        storage: multer.diskStorage({
            destination: uploadDir,
            filename(request, file, callback) {
                const hash = crypto.randomBytes(10).toString('HEX');
                const fileName = `${hash}-${file.originalname}`;
                callback(null, fileName);
            },
        }),
    },
} as IUploadConfig;
