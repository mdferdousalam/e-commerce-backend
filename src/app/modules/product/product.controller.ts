/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ERROR, SUCCESS } from '../shared/api.response.types';
import { IProduct } from './product.interface';
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

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    if (searchTerm) {
      const products = await ProductServices.searchProductsFromDB(
        searchTerm as string,
      );
      SUCCESS(
        res,
        `Searched Products ${searchTerm} retrieved Successfully`,
        products,
      );
    } else {
      const products = await ProductServices.getAllProductsFromDB();
      SUCCESS(res, 'All Products retrieved Successfully', products);
    }
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const validationResult = productSchema.partial().safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json(validationResult.error);
    }

    const productData = validationResult.data;
    const product = await ProductServices.updateProductIntoDB(
      req.params.productId,
      productData as IProduct,
    );
    if (!product) {
      SUCCESS(res, 'Product not found');
    } else {
      SUCCESS(res, 'Product updated successfully', product);
    }
  } catch (error: any) {
    ERROR(res, 'Failed to update Product', [error.message], 500);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.deleteProductFromDB(
      req.params.productId,
    );
    if (!product) {
      SUCCESS(res, 'Product not found');
    } else {
      SUCCESS(res, 'Product Deleted successfully');
    }
  } catch (error: any) {
    ERROR(res, 'Failed to update Product', [error.message], 500);
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
