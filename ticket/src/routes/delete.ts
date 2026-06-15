import express from 'express';
import type { Request, Response } from 'express';
import { Ticket } from '../models/index.ts';
import { NotFoundError } from '@doffy-gittix/common';
import { checkAuthHandler } from '../middleware/checkAuthHandler.ts';

const router = express.Router();

router.delete(
  '/api/tickets/:id',
  checkAuthHandler,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) {
      throw new NotFoundError();
    }
    return res.send({ success: true });
  },
);

export { router as deleteRouter };
