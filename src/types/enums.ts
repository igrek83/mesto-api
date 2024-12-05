enum ErrorsMessages {
  THE_USER_WITH_THIS_EMAIL_ALREADY_EXISTS = 'Пользователь с данным email уже существует',
  INCORRECT_USERNAME_OR_PASSWORD = 'Неправильный логин или пароль',
  SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка',
  ERROR_WHEN_CREATING_A_USER = 'Ошибка при создании пользователя',
  ERROR_UPDATING_USER_DATA = 'Ошибка при обновлении данных пользователя',
  ERROR__UPDATING_THE_USERS_AVATAR = 'Ошибка при обновлении аватара пользователя',
  USER_WAS_NOT_FOUND = 'Пользователь не найден',
  ERROR_WHEN_CREATING_A_CARD = 'Ошибка при создании карточки',
  ERROR_WHEN_SETTING_A_LIKE = 'Ошибка при постановке лайка',
  ERROR_WHEN_DELETING_A_LIKE = 'Ошибка при удалении лайка',
  ERROR_DELETING_THE_CARD = 'Ошибка при удалении карточки',
}

enum SuccessMessages {
  SUCCESS_DELETE_CARD = 'Карточка удалена успешно',
  SUCCESS_ADD_LIKE = 'Лайк добавлен успешно',
  SUCCESS_DELETE_LIKE = 'Лайк удален успешно',
}

enum ErrorsStatuses {
  INVALID_AUTHORIZATION_ERROR = 401,
  SERVER_ERROR = 500,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
}

enum SuccessStatuses {
  SUCCESSFUL_REQUEST = 200,
  SUCCESSFUL_CREATION = 201,
}

export {
  ErrorsMessages,
  ErrorsStatuses,
  SuccessMessages,
  SuccessStatuses,
};
