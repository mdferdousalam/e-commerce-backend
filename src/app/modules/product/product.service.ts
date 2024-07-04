import { IProduct } from './product.interface';
import ProductModel from './product.model';

const createProductIntoDB = async (productData: IProduct) => {
  const product = new ProductModel(productData);
  return await product.save();
};

const getAllProductsFromDB = async () => {
  return await ProductModel.find();
};

const getProductByIdFromDB = async (productId: string) => {
  return await ProductModel.findById({ _id: productId });
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
};
