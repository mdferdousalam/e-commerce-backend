/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ERROR, SUCCESS } from '../shared/api.response.types';
import { productSchema } from './product.schema';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const validationResult = productSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json(validationResult.error);
    }
    const productData = validationResult.data;
    const product = await ProductServices.createProductIntoDB(productData);
    SUCCESS(res, 'Product Created Successfully', product);
  } catch (error: any) {
    ERROR(res, 'Failed to create Product', [error.message]);
  }
};

const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await ProductServices.getAllProductsFromDB();
    SUCCESS(res, 'All Products retrieved Successfully', products);
  } catch (error: any) {
    ERROR(res, 'Failed to get Products', [error.message]);
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.getProductByIdFromDB(
      req.params.productId,
    );

    if (product) {
      SUCCESS(res, 'Product get Successfully', product);
    } else {
      SUCCESS(res, 'Product not found');
    }
  } catch (error: any) {
    ERROR(res, 'Failed to get Product', [error.message], 500);
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
};
