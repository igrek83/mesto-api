import mongoose from 'mongoose';
import User from '../models/user';

export default async (userId: mongoose.Schema.Types.ObjectId, body: {
  name?: string;
  about?: string;
  avatar?: string;
}) => User.findByIdAndUpdate(
  userId,
  { ...body },
  {
    new: true,
    runValidators: true,
    upsert: false,
  },
);
