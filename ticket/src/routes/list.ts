import express from 'express';
import type { Request, Response } from 'express';
import { Ticket } from '../models/ticket.ts';

const router = express.Router();

router.get('/api/tickets', async (_req: Request, res: Response) => {
  const tickets = await Ticket.find();
  return res.send(
    tickets.map(({ _id, title, price }) => ({
      id: _id,
      title,
      price,
    })),
  );
});

export { router as listRouter };
