/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ERROR, SUCCESS } from '../shared/api.response.types';
import { orderSchema } from './order.schema';
import { OrderServices } from './order.service';
import { IOrder } from './order.interface';

const createOrder = async (req: Request, res: Response) => {
  const validationResult = orderSchema.safeParse(req.body);
  if (!validationResult.success) {
    ERROR(
      res,
      'Failed to validate Order data, please provide correct data',
      [validationResult.error.errors],
      400,
    );
  }

  try {
    const order = await OrderServices.createOrderIntoDB(validationResult.data as IOrder);
    SUCCESS(res, 'Order Created Successfully', order);
  } catch (error: any) {
    ERROR(res, 'Failed to create Order', [error.message], 500);
  }
};

export const OrderControllers = {
  createOrder,
};
