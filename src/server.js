import express from 'express';
import cors from 'cors';
import {
  getAllProductsController,
  getProductByIdController,
} from './controllers/products.js';

import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/products', getAllProductsController);

  app.get('/products/:productId', getProductByIdController);

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found!' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
