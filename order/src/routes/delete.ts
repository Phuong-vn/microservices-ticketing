import express from 'express';
import type { Request, Response } from 'express';
import { NotFoundError } from '@doffy-gittix/common';
import { Order } from '../models/order.ts';
import { checkAuthHandler } from '../middleware/checkAuthHandler.ts';

const router = express.Router();

router.delete(
  '/api/orders/:id',
  checkAuthHandler,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      throw new NotFoundError();
    }
    return res.send({ success: true });
  },
);

export { router as deleteRouter };
