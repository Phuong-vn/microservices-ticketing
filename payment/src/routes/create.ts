import express from 'express';
import type { Request, Response } from 'express';
import { body } from 'express-validator';
import { validationHandler } from '@doffy-gittix/common';
import { Ticket } from '../models/index.ts';
import { checkAuthHandler } from '../middleware/checkAuthHandler.ts';
import { natsWrapper } from '../natsWrapper.ts';
import { TicketCreatedPublisher } from '../nats/publisher.ts';

const router = express.Router();

router.post(
  '/api/tickets',
  checkAuthHandler,
  [
    body('title').trim().notEmpty().withMessage('required'),
    body('price').trim().notEmpty().withMessage('required'),
  ],
  validationHandler,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id
    });
    await ticket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket._id.toString(),
      title: ticket.title,
      price: Number(ticket.price),
      version: ticket.version,
      userId: ticket.userId,
    });

    return res.send({
      id: ticket._id,
      title: ticket.title,
      price: ticket.price,
    });
  },
);

export { router as createRouter };
