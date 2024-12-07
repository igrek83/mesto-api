import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { SuccessStatuses } from '../types/enums';

const { SUCCESSFUL_REQUEST } = SuccessStatuses;

export default (req: Request, res: Response, next: NextFunction) => {
  Card.find()
    .then((cards) => res.status(SUCCESSFUL_REQUEST).send({ cards }))
    .catch(() => {
      next();
    });
};
