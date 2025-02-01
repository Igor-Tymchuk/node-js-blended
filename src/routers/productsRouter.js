import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getAllProductsController));

router.get('/:productId', ctrlWrapper(getProductByIdController));

router.delete('/:productId', ctrlWrapper(deleteProductController));

router.post('/', ctrlWrapper(createProductController));

export default router;
