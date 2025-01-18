import { Schema, model } from 'mongoose';

const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['books', 'electronics', 'clothing', 'other'],
      default: 'other',
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

export const ProductsCollection = model('product', productsSchema);
