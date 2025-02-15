import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { registerUserSchema } from '../validation/Users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController } from '../controllers/users.js';

const router = Router();
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

export default router;
