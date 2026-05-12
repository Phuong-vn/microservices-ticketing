import express from 'express';
import type { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket.ts';
import { NotFoundError, validationHandler } from '@doffy-gittix/common';
import { checkAuthHandler } from '../middleware/checkAuthHandler.ts';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  [
    body('title').trim().notEmpty().withMessage('required'),
    body('price').trim().notEmpty().withMessage('required'),
  ],
  validationHandler,
  checkAuthHandler,
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
    return res.send({
      id: updated._id,
      title: updated.title,
      price: updated.price,
    });
  },
);

export { router as updateRouter };
