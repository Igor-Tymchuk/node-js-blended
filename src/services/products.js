import { ProductsCollection } from '../db/models/product.js';

// export const getAllProducts = async () => {
//     const products = await ProductsCollection.find();
//     return products;
// };

export const getAllProducts = (filters) => {
  const productsQuery = ProductsCollection.find();
  if (filters.category) {
    productsQuery.where('category').equals(filters.category);
  }
  if (filters.minPrice) {
    productsQuery.where('price').gte(filters.minPrice);
  }
  if (filters.maxPrice) {
    productsQuery.where('price').lte(filters.maxPrice);
  }
  return ProductsCollection.find().merge(productsQuery).exec();
};

// export const getProductById = (productId) =>
//   ProductsCollection.findOne({ _id: productId });

export const getProductById = (productId) =>
  ProductsCollection.findById(productId);

export const createProduct = (productData) =>
  ProductsCollection.create(productData);

export const deleteProduct = (productId) =>
  ProductsCollection.findByIdAndDelete(productId);

// export const deleteProduct = (productId) =>
//   ProductsCollection.findOneAndDelete({ _id: productId });
