import createHttpError from 'http-errors';
import { findUserByEmail, createNewUser } from '../services/users.js';

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
