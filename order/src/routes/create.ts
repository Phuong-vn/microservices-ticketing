import express from 'express';
import type { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validationHandler,
  OrderStatus,
  NotFoundError,
  BadRequestError,
} from '@doffy-gittix/common';
import { Order, Ticket } from '../models/index.ts';
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
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError('existed order');
    }

    const expiredAt = new Date(performance.now() + 15 * 1000 * 60); // next 15 mins
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiredAt,
      ticket,
    });
    await order.save();

    await new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order._id.toString(),
      userId: order.userId,
      status: order.status,
      expiredAt: order.expiredAt.toISOString(),
      ticket: {
        id: ticket._id.toString(),
        price: ticket.price,
      },
    });

    return res.status(201).send({
      id: order._id,
      userId: order.userId,
      status: order.status,
      expiredAt: order.expiredAt,
    });
  },
);

export { router as createRouter };
