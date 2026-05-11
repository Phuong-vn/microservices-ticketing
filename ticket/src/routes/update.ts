import express from 'express';
import type { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket.ts';
import { NotFoundError, validationHandler } from '@doffy-gittix/common';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  [
    body('title').trim().notEmpty().withMessage('required'),
    body('price').trim().notEmpty().withMessage('required'),
  ],
  validationHandler,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, price } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(id, {
      title,
      price,
    });
    if (!ticket) {
      throw new NotFoundError();
    }
    return res.send({
      id: ticket._id,
      title: ticket.title,
      price: ticket.price,
    });
  },
);

export { router as updateRouter };
