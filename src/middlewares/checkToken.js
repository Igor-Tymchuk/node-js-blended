import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { findUserById } from '../services/users.js';

export const checkToken = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Token not found!'));
    return;
  }
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Authorization type must be Bearer!'));
    return;
  }
  const { userId } = jwt.verify(token, env('JWT_SECRET'));
  const user = await findUserById(userId);
  if (!user) {
    next(createHttpError(404, 'User not found!'));
    return;
  }
  req.user = user;
  next();
};
