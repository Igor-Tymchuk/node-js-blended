import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createProductsSchema } from '../validation/products.js';
import { validateBody } from '../utils/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(getAllProductsController));

router.get('/:productId', isValidId, ctrlWrapper(getProductByIdController));

router.delete('/:productId', isValidId, ctrlWrapper(deleteProductController));

router.post(
  '/',
  validateBody(createProductsSchema),
  ctrlWrapper(createProductController),
);

export default router;
