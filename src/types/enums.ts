enum ErrorsMessages {
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
