import {
  getAllProducts,
  getProductById,
  createProduct,
} from '../services/products.js';

export const getAllProductsController = async (req, res) => {
  const products = await getAllProducts();

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
    res.status(404).json({
      message: 'Product not found',
    });
    return;
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
