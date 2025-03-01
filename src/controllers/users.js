import createHttpError from 'http-errors';
import {
  findUserByEmail,
  createNewUser,
  updateUserWithToken,
  logout,
  // createSession,
} from '../services/users.js';
import bcrypt from 'bcrypt';
import { env } from '../utils/env.js';
// import { setupCookies } from '../utils/setupCookies.js';

export const registerUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (user) throw createHttpError(409, 'Email in use');
  const newUser = await createNewUser(req.body);
  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    token: newUser.token,
  });
};

export const loginUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (!user) throw createHttpError(401, 'User not found');
  const passwordValidate = bcrypt.compare(req.body.password, user.password);
  if (!passwordValidate) throw createHttpError(401, 'Wrong credentials');
  const userWithToken = await updateUserWithToken(user._id);
  res.json({
    user: {
      name: userWithToken.name,
      email: userWithToken.email,
    },
    token: userWithToken.token,
  });
};

export const logoutUserController = async (req, res) => {
  await logout(req.user._id);
  res.sendStatus(204);
};
