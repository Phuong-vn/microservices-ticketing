import express from 'express';
import type { Request, Response } from 'express';
import { NotFoundError, OrderStatus, UnauthorizedError } from '@doffy-gittix/common';
import { Order } from '../models/order.ts';
import { checkAuthHandler } from '../middleware/checkAuthHandler.ts';

const router = express.Router();

router.patch(
  '/api/orders/:id',
  checkAuthHandler,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      throw new NotFoundError();
    }
    const userId = req.currentUser!.id;
    if (userId != order.userId) {
      throw new UnauthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    return res.send({ success: true });
  },
);

export { router as deleteRouter };
