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
