import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from '../services/products.js';
import createHttpError from 'http-errors';
import { parseFilters } from '../utils/parseFilters.js';

export const getAllProductsController = async (req, res) => {
  const filters = parseFilters(req.query);
  const products = await getAllProducts(filters);

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const product = await getProductById(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const newProduct = await createProduct(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: newProduct,
  });
};

export const deleteProductController = async (req, res) => {
  const { productId } = req.params;
  const product = await deleteProduct(productId);
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  // res.status(204).end();
  res.sendStatus(204);
};
