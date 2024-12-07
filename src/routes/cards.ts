import { Router } from 'express';
import createCard from '../controllers/create-card';
import getListCards from '../controllers/get-list-cards';
import likeCard from '../controllers/like-card';
import dislikeCard from '../controllers/dislike-card';
import deleteCard from '../controllers/delete-card';

import auth from '../middleware/auth';
import cardCreateValidate from '../validations/card-create-validate';
import cardIdValidate from '../validations/card-id-validate';

const cards: Router = Router();

cards.post('/cards', auth, cardCreateValidate, createCard);
cards.put('/cards/:cardId/likes', auth, cardIdValidate, likeCard);
cards.delete('/cards/:cardId/likes', auth, cardIdValidate, dislikeCard);
cards.delete('/cards/:cardId', auth, cardIdValidate, deleteCard);
cards.get('/cards', auth, getListCards);

export default cards;
