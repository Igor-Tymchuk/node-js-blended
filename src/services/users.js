import { SessionsCollection } from '../db/models/Session.js';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { createSessionObject } from '../utils/createSessionUtils.js';

export const findUserByEmail = (email) => UsersCollection.findOne({ email });

export const createNewUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return UsersCollection.create({
    ...userData,
    password: hashedPassword,
  });
};

export const createSession = async (userId) => {
  await SessionsCollection.findOneAndDelete({ userId });
  return SessionsCollection.create({ ...createSessionObject(), userId });
};
