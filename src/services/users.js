// import { SessionsCollection } from '../db/models/Session.js';
import { UsersCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
// import { createSessionObject } from '../utils/createSessionUtils.js';

export const findUserByEmail = (email) => UsersCollection.findOne({ email });

export const updateUserWithToken = (userId) => {
  const token = jwt.sign({ userId }, env('JWT_SECRET'));

  return UsersCollection.findByIdAndUpdate(userId, { token }, { new: true });
};

export const createNewUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await UsersCollection.create({
    ...userData,
    password: hashedPassword,
  });
  return updateUserWithToken(user._id);
};

export const findUserById = (userId) => UsersCollection.findById(userId);
export const logout = (userId) =>
  UsersCollection.findByIdAndUpdate(userId, { token: '' });
// export const createSession = async (userId) => {
//   await SessionsCollection.findOneAndDelete({ userId });
//   return SessionsCollection.create({ ...createSessionObject(), userId });
// };
