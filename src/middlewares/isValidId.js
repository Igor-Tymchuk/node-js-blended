import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    next(createHttpError(400, 'Invalid Id'));
    return;
  }

  next();
};
