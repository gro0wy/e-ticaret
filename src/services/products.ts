import { IGetProductsResponse } from 'models';

export const getProducts = async () => {
  let response: IGetProductsResponse;

  response = require('static/json/products.json');

  const { products } = response.data || [];

  return products;
};
