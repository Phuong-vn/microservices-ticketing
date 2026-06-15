import express from 'express';
import type { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/index.ts';
import { NotFoundError, validationHandler } from '@doffy-gittix/common';
import { checkAuthHandler } from '../middleware/checkAuthHandler.ts';
import { natsWrapper } from '../natsWrapper.ts';
import { TicketUpdatedPublisher } from '../nats/publisher.ts';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  checkAuthHandler,
  [
    body('title').trim().notEmpty().withMessage('required'),
    body('price').trim().notEmpty().withMessage('required'),
  ],
  validationHandler,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, price } = req.body;
    const updated = await Ticket.findByIdAndUpdate(
      id,
      { title, price },
      { new: true },
    );
    if (!updated) {
      throw new NotFoundError();
    }

    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: updated._id.toString(),
      title: updated.title,
      version: updated.version,
      price: Number(updated.price),
      userId: updated.userId,
    });

    return res.send({
      id: updated._id,
      title: updated.title,
      price: updated.price,
    });
  },
);

export { router as updateRouter };
