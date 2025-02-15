import createHttpError from 'http-errors';
import {
  findUserByEmail,
  createNewUser,
  createSession,
} from '../services/users.js';
import bcrypt from 'bcrypt';
import { setupCookies } from '../utils/setupCookies.js';

export const registerUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (user) throw createHttpError(409, 'Email in use');
  const newUser = await createNewUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

export const loginUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (!user) throw createHttpError(401, 'User not found');

  const passwordValidate = bcrypt.compare(req.body.password, user.password);

  if (!passwordValidate) throw createHttpError(401, 'Wrong credentials');

  const session = await createSession(user._id);
  setupCookies(session.refreshToken, session._id, res);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// Створіть роут POST /users/login для аутентифікації користувача. Тіло запиту має в себе включати наступні властивості:
// email - обовʼязково
// password - обовʼязково
// Обробка цього роута має включати:
// Реєстрацію роута в файлі src/routers/users.js
// Валідацію отриманих даних
// Опис контролера для цього роута в файлі src/controllers/users.js
// Створення сервісу в файлі src/services/users.js
// Переконайтеся, що користувач із такою поштою та паролем існує в системі, поверніть за допомогою бібліотеки createHttpError 401 помилку в іншому випадку.
// Якщо користувача за переданими даними було знайдено, то створіть для нього сессію, в яку запишіть згенеровані access та refresh токени. Стара сесія, за її наявності, має бути видалена. Вкажіть час життя 15 хв для access токену та 30 днів для refresh токену.
// Запишіть рефреш токен в cookies, а access токен поверніть в тілі відповіді.
// Відповідь сервера, в разі успішного логіну, має бути зі статусом 200 і містити об’єкт з наступними властивостями:
// {
//  status: 200,
//  message: "Successfully logged in an user!",
//  data:
//   // об'єкт з властивістю `accessToken`, що містить значення створеного access токена
// }
