import mongoose from 'mongoose';
import { isEmail, isURL } from 'validator';
import { compare } from 'bcryptjs';
import type { UserType } from '../types/interfaces';
import ErrorsConstructor from '../errors/errors-constructor';
import { ErrorsMessages, ErrorsStatuses } from '../types/enums';

const { INCORRECT_USERNAME_OR_PASSWORD } = ErrorsMessages;
const { INVALID_AUTHORIZATION_ERROR } = ErrorsStatuses;

const userSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Пароль должен быть не менее 8 символов'],
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    validate: {
      validator: (v: string): boolean => isEmail(v),
      message: 'Введите корректный email',
    },
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link: string): boolean => isURL(link),
    },
  },
  about: {
    type: String,
    default: 'Исследователь',
  },
}, { versionKey: false });

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email })
    .select('+password')
    .then((user: { password: string; }) => {
      if (!user) {
        return Promise.reject(new ErrorsConstructor(INVALID_AUTHORIZATION_ERROR, INCORRECT_USERNAME_OR_PASSWORD));
      }

      return compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ErrorsConstructor(INVALID_AUTHORIZATION_ERROR, INCORRECT_USERNAME_OR_PASSWORD));
          }

          return user;
        });
    });
});

export default mongoose.model<UserType>('user', userSchema);
