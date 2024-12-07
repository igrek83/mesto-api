import winston from 'winston';
import expressWinston from 'express-winston';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'request-%DATE%.log',
      maxsize: 1024,
      maxFiles: 7,
      zippedArchive: true,
    }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error-%DATE%.log',
      maxsize: 1024,
      maxFiles: 7,
      zippedArchive: true,
    }),
  ],
  format: winston.format.json(),
});
