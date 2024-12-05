import { Types } from 'mongoose';

interface UserType {
  name?: string,
  email: string,
  password: string,
  avatar?: string,
  about?: string,
  findUserByCredentials(email: string, password: string): any;
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
