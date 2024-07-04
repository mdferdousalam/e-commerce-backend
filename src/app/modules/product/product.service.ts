import { IProduct } from './product.interface';
import ProductModel from './product.model';

const createProductIntoDB = async (productData: IProduct) => {
  const product = new ProductModel(productData);
  return await product.save();
};

export const ProductServices = {
  createProductIntoDB,
};
