import { Router } from 'express';
import createCard from '../controllers/create-card';
import getListCards from '../controllers/get-list-cards';
import likeCard from '../controllers/like-card';
import dislikeCard from '../controllers/dislike-card';
import deleteCard from '../controllers/delete-card';

const cards: Router = Router();

cards.post('/cards', createCard);
cards.get('/cards', getListCards);
cards.put('/cards/:cardId/likes', likeCard);
cards.delete('/cards/:cardId/likes', dislikeCard);
cards.delete('/cards/:cardId', deleteCard);

export default cards;
