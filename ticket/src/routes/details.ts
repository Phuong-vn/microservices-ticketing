import express from 'express';
import type { Request, Response } from 'express';
import { Ticket } from '../models/ticket.ts';
import { NotFoundError } from '@doffy-gittix/common';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const ticket = await Ticket.findById({ _id: id });
  if (!ticket) {
    throw new NotFoundError();
  }
  return res.send({
    id: ticket._id,
    title: ticket.title,
    price: ticket.price,
  });
});

export { router as detailsRouter };
