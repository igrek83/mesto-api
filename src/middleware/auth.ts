import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorsMessages, ErrorsStatuses } from '../types/enums';

import ErrorsConstructor from '../errors/errors-constructor';

const { UNAUTHORIZED } = ErrorsMessages;
const { INVALID_AUTHORIZATION_ERROR } = ErrorsStatuses;

export default (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new ErrorsConstructor(INVALID_AUTHORIZATION_ERROR, UNAUTHORIZED);
  }

  let payload;
  try {
    payload = jwt.verify(token, 'user-secret-token');
    // @ts-ignore
    req.user = payload;
  } catch (err) {
    throw new ErrorsConstructor(INVALID_AUTHORIZATION_ERROR, UNAUTHORIZED);
  }
  next();
};
