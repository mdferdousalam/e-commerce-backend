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

const updateProductIntoDB = async (
  productId: string,
  productData: IProduct,
) => {
  return await ProductModel.findByIdAndUpdate(productId, productData, { new: true });
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductIntoDB,
};
