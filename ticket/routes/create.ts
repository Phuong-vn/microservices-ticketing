import express from 'express';
import type { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket.ts';
import { validationHandler } from '@doffy-gittix/common';

const router = express.Router();

router.post(
  '/api/tickets',
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
    });
    await ticket.save();
    return res.send({
      id: ticket._id,
      title: ticket.title,
      price: ticket.price,
    });
  },
);

export { router as createRouter };
