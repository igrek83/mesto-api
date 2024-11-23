import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';

export default (req: Request, res: Response, next: NextFunction) => {
  Card.find()
    .then((cards) => res.status(200).send({ cards }))
    .catch(() => {
      next();
    });
};
