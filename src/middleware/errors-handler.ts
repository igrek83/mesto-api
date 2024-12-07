import { Request, Response, NextFunction } from 'express';
import { ErrorsMessages, ErrorsStatuses } from '../types/enums';

const { SERVER_ERROR_MESSAGE } = ErrorsMessages;
const { SERVER_ERROR } = ErrorsStatuses;

export default (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.log(err);
  const { statusCode = SERVER_ERROR, message = SERVER_ERROR_MESSAGE } = err;
  console.log(statusCode, message);
  res.status(statusCode).send({ message });
  next();
};
