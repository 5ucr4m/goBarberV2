import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const uploadDir = path.resolve(__dirname, '..', '..', 'uploads');

export default {
    directory: uploadDir,
    storage: multer.diskStorage({
        destination: uploadDir,
        filename(request, file, callback) {
            const hash = crypto.randomBytes(10).toString('HEX');
            const fileName = `${hash}-${file.originalname}`;
            callback(null, fileName);
        },
    }),
};
