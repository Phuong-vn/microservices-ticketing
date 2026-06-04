import express from 'express';
import type { Request, Response } from 'express';
import { body } from 'express-validator';
import { validationHandler } from '@doffy-gittix/common';
import { Order } from '../models/order.ts';
import { checkAuthHandler } from '../middleware/checkAuthHandler.ts';
import { natsWrapper } from '../natsWrapper.ts';
import { OrderCreatedPublisher } from '../nats/publisher.ts';

const router = express.Router();

router.post(
  '/api/orders',
  checkAuthHandler,
  [body('ticketId').trim().notEmpty().withMessage('required')],
  validationHandler,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    const order = Order.build({
      userId: req.currentUser!.id,
      ticketId: ticketId,
    });
    await order.save();

    await new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order._id.toString(),
      userId: order.userId,
      ticketId: order.ticketId,
    });

    return res.send({
      id: order._id,
      userId: order.userId,
      ticketId: order.ticketId,
    });
  },
);

export { router as createRouter };
