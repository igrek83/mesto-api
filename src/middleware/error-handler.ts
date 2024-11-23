import { NextFunction, Response } from 'express';

export default function errorHandler(
  res: Response,
  next: NextFunction,
  messageError: string = 'На сервере произошла ошибка',
  statusCode: number = 500,
): void {
  next(res.status(statusCode)
    .send({ message: messageError }));
}
