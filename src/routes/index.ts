import {
  Router,
  NextFunction,
  Request,
  Response,
} from 'express';
import users from './users';
import cards from './cards';
import ErrorsConstructor from '../errors/errors-constructor';
import { ErrorsMessages, ErrorsStatuses } from '../types/enums';

const { SERVER_ERROR_MESSAGE } = ErrorsMessages;
const { SERVER_ERROR } = ErrorsStatuses;

const router: Router = Router();

router.use(users);
router.use(cards);
router.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new ErrorsConstructor(SERVER_ERROR, SERVER_ERROR_MESSAGE));
});

export default router;
