import express from 'express';
import type { Request, Response } from 'express';
import { Order } from '../models/order.ts';
import { checkAuthHandler } from '../middleware/checkAuthHandler.ts';

const router = express.Router();

router.get(
  '/api/orders',
  checkAuthHandler,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.id;
    const orders = await Order.find({ userId }).populate('ticket');
    const formattedOrders = orders.map(({ _id, userId, ticket }) => ({
      id: _id,
      userId,
      ticket,
    }));
    return res.send(formattedOrders);
  },
);

export { router as listRouter };
