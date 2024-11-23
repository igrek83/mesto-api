import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import {
  ErrorsMessages,
  ErrorsStatuses,
  SuccessMessages,
} from '../types/enums';
import errorHandler from '../middleware/error-handler';

const { ERROR_DELETING_THE_CARD } = ErrorsMessages;
const { BAD_REQUEST } = ErrorsStatuses;
const { SUCCESS_DELETE_CARD } = SuccessMessages;

export default (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(() => res.status(200).send({ status: 'success', message: SUCCESS_DELETE_CARD }))
    .catch((err) => {
      if (err.name === 'CastError') {
        errorHandler(res, next, ERROR_DELETING_THE_CARD, BAD_REQUEST);
      } else {
        next();
      }
    });
};
