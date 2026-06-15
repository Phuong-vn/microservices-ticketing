import express from 'express';
import type { Request, Response } from 'express';
import { Ticket } from '../models/index.ts';

const router = express.Router();

router.get('/api/tickets', async (_req: Request, res: Response) => {
  const tickets = await Ticket.find();
  const formatTickets = tickets.map(({ _id, title, price }) => ({
    id: _id,
    title,
    price,
  }));
  return res.send(formatTickets);
});

export { router as listRouter };
