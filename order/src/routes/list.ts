import express from 'express';
import type { Request, Response } from 'express';
import { Order } from '../models/order.ts';

const router = express.Router();

router.get('/api/orders', async (_req: Request, res: Response) => {
  const orders = await Order.find();
  const formatOrders = orders.map(({ _id, userId, ticketId }) => ({
    id: _id,
    userId,
    ticketId,
  }));
  return res.send(formatOrders);
});

export { router as listRouter };
