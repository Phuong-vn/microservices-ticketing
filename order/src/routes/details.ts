import express from 'express';
import type { Request, Response } from 'express';
import { NotFoundError } from '@doffy-gittix/common';
import { Order } from '../models/order.ts';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await Order.findById({ _id: id });
  if (!order) {
    throw new NotFoundError();
  }
  return res.send({
    id: order._id,
    userId: order.userId,
    ticketId: order.ticketId,
  });
});

export { router as detailsRouter };
