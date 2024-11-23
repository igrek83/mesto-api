import { Router } from 'express';
import createUser from '../controllers/create-user';
import getListUsers from '../controllers/get-list-users';
import getUser from '../controllers/get-user';
import updateUser from '../controllers/update-user';
import updateAvatarUser from '../controllers/update-avatar-user';

const users: Router = Router();

users.get('/users', getListUsers);
users.get('/users/:userId', getUser);
users.post('/users', createUser);
users.patch('/users/me', updateUser);
users.patch('/users/avatar', updateAvatarUser);
export default users;
