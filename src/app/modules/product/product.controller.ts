import { Request, Response } from 'express';
import { productSchema } from './product.schema';
import { ProductServices } from './product.service';
import { ERROR, SUCCESS } from '../shared/api.response.types';

const createProduct = async (req: Request, res: Response) => {
  try {
    const validationResult = productSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json(validationResult.error);
    }
    const productData = validationResult.data;
    const product = await ProductServices.createProductIntoDB(productData);
    SUCCESS(res, 'Product Created Successfully', product);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    ERROR(res, 'Failed to create Product', [error.message]);
  }
};

export const ProductControllers = {
  createProduct,
};
