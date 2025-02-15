import { THIRTY_DAYS } from '../constants/index.js';

export const setupCookies = (refreshToken, sessionId, res) => {
  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    expires: new Date(THIRTY_DAYS + Date.now()),
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(THIRTY_DAYS + Date.now()),
  });
};
