import { Router } from 'express';
import createUser from '../controllers/create-user';
import loginUser from '../controllers/login-user';
import getListUsers from '../controllers/get-list-users';
import infoUser from '../controllers/info-user';

import updateUser from '../controllers/update-user';
import updateAvatarUser from '../controllers/update-avatar-user';
import auth from '../middleware/auth';
import createUserValidate from '../validations/create-user-validate';
import updateUserValidate from '../validations/update-user-validate';
import updateAvatarValidate from '../validations/update-avatar-validate';

const users: Router = Router();

users.post('/signup', createUserValidate, createUser);
users.post('/signin', loginUser);
users.patch('/users/me', auth, updateUserValidate, updateUser);
users.patch('/users/avatar', auth, updateAvatarValidate, updateAvatarUser);
users.get('/users/me', auth, infoUser);
users.get('/users', auth, getListUsers);
export default users;
