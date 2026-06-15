import express from 'express';
import type { Request, Response } from 'express';
import { NotFoundError, UnauthorizedError } from '@doffy-gittix/common';
import { Order } from '../models/order.ts';
import { checkAuthHandler } from '../middleware/checkAuthHandler.ts';

const router = express.Router();

router.get(
  '/api/tickets/:id',
  checkAuthHandler,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findById({ _id: id }).populate('ticket');
    if (!order) {
      throw new NotFoundError();
    }
    const userId = req.currentUser!.id;
    if (userId !== order.userId) {
      throw new UnauthorizedError();
    }
    return res.send({
      id: order._id,
      ticket: order.ticket,
    });
  },
);

export { router as detailsRouter };
