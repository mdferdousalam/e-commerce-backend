import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.routes';
import { OrderRoutes } from './app/modules/order/order.routes';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send(`Server health is good and running well`);
});

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
export default app;
