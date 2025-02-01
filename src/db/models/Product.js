import { Schema, model } from 'mongoose';
import { CATEGORIES } from '../../constants/index.js';

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
      enum: CATEGORIES,
      default: 'other',
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProductsCollection = model('product', productsSchema);
