import { CATEGORIES } from '../constants/index.js';

const parseCategory = (category) => {
  if (CATEGORIES.includes(category)) {
    return category;
  }
};

const parsePrice = (price) => {
  const parseInt = Number.parseInt(price);
  if (Number.isNaN(parseInt)) return;
  return parseInt;
};

export const parseFilters = (query) => {
  return {
    category: parseCategory(query.category),
    minPrice: parsePrice(query.minPrice),
    maxPrice: parsePrice(query.maxPrice),
  };
};
