import mongoose from 'mongoose';
import type { UserType } from '../types/interfaces';

const userSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
}, { versionKey: false });

export default mongoose.model<UserType>('user', userSchema);
