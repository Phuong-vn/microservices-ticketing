import express from 'express';
import type { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  UnauthorizedError,
  validationHandler,
} from '@doffy-gittix/common';
import { Order, Payment } from '../models/index.ts';
import { checkAuthHandler } from '../middleware/checkAuthHandler.ts';
import { stripe } from '../stripe.ts';
import { PaymentCompletePublisher } from '../nats/publisher.ts';
import { natsWrapper } from '../natsWrapper.ts';

const router = express.Router();

router.post(
  '/api/payments',
  checkAuthHandler,
  [
    body('token').trim().notEmpty().withMessage('required'),
    body('orderId').trim().notEmpty().withMessage('required'),
  ],
  validationHandler,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    }
    if (order.status !== OrderStatus.Created) {
      throw new BadRequestError('order is not ready to pay');
    }
    if (order.userId !== req.currentUser?.id) {
      throw new UnauthorizedError();
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.price,
      currency: 'usd',
    });
    const confirmedPaymentIntent = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      {
        confirmation_token: token,
      },
    );
    if (confirmedPaymentIntent.status !== 'succeeded') {
      throw new BadRequestError('fail to confirm payment');
    }
    const payment = Payment.build({ orderId, userId: order.userId });
    await payment.save();
    await new PaymentCompletePublisher(natsWrapper.client).publish({
      id: payment._id.toString(),
    });

    return res.send(confirmedPaymentIntent);
  },
);

export { router as createRouter };
