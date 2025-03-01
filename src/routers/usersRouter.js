import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/Users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/users.js';
import { checkToken } from '../middlewares/checkToken.js';

const router = Router();
router.post(
  '/signup',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post('/logout', checkToken, ctrlWrapper(logoutUserController));

export default router;
