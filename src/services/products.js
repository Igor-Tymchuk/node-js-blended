import { ProductsCollection } from '../db/models/product.js';

// export const getAllProducts = async () => {
//     const products = await ProductsCollection.find();
//     return products;
// };

export const getAllProducts = () => ProductsCollection.find();

// export const getProductById = (productId) =>
//   ProductsCollection.findOne({ _id: productId });

export const getProductById = (productId) =>
  ProductsCollection.findById(productId);
