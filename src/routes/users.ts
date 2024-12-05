import { Router } from 'express';
import createUser from '../controllers/create-user';
import signInUser from '../controllers/sign-in-user';
import getListUsers from '../controllers/get-list-users';
import getUser from '../controllers/get-user';
import updateUser from '../controllers/update-user';
import updateAvatarUser from '../controllers/update-avatar-user';
import auth from '../middleware/auth';

const users: Router = Router();

users.post('/users', createUser);
users.post('/signin', signInUser);
// @ts-ignore
users.get('/users', auth, getListUsers);
users.get('/users/:userId', getUser);
users.patch('/users/me', updateUser);
users.patch('/users/avatar', updateAvatarUser);
export default users;
