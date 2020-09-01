import crypto from 'crypto';
import path from 'path';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const filenameHash = crypto.randomBytes(8).toString('hex');
        const newFilename = `${filenameHash}-${file.originalname}`;

        callback(null, newFilename);
      },
    }),
  },
};
