import { Types } from 'mongoose';

interface UserType {
  name: string,
  avatar: string,
  about: string,
}

interface CardType {
  name: string,
  link: string,
  owner: Types.ObjectId,
  likes: Array<Types.ObjectId>,
  createdAt: Date,
}

export type {
  UserType,
  CardType,
};
