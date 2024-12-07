import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import {
  ErrorsMessages, ErrorsStatuses,
  SuccessMessages,
  SuccessStatuses,
} from '../types/enums';

import ErrorsConstructor from '../errors/errors-constructor';

const { BAD_REQUEST, NO_RIGHTS_ERROR } = ErrorsStatuses;
const { ERROR_DELETING_THE_CARD, THERE_ARE_NO_RIGHTS_FOR_THIS_ACTION } = ErrorsMessages;
const { SUCCESS_DELETE_CARD } = SuccessMessages;
const { SUCCESSFUL_REQUEST } = SuccessStatuses;

export default async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { _id: userId } = req.user;
  Card
    .findById(req.params.cardId).populate('owner')
    .then((card) => {
      if (!card) {
        throw new ErrorsConstructor(BAD_REQUEST, ERROR_DELETING_THE_CARD);
      } else if (card.owner !== userId) {
        throw new ErrorsConstructor(NO_RIGHTS_ERROR, THERE_ARE_NO_RIGHTS_FOR_THIS_ACTION);
      } else {
        Card.findByIdAndDelete(req.params.cardId)
          .then(() => {
            res
              .status(SUCCESSFUL_REQUEST)
              .send({ message: SUCCESS_DELETE_CARD });
          })
          .catch(next);
      }
    })
    .catch(next);
};
