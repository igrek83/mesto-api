import {
  Router,
  NextFunction,
  Request,
  Response,
} from 'express';
import users from './users';
import cards from './cards';
import errorHandler from '../middleware/error-handler';
import { ErrorsMessages, ErrorsStatuses } from '../types/enums';

const { SERVER_ERROR_MESSAGE } = ErrorsMessages;
const { SERVER_ERROR } = ErrorsStatuses;

const router: Router = Router();

router.use(users);
router.use(cards);
router.use('*', (req: Request, res: Response, next: NextFunction) => {
  errorHandler(res, next, SERVER_ERROR_MESSAGE, SERVER_ERROR);
});

export default router;
