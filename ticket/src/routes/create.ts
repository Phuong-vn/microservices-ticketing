import express from 'express';
import type { Request, Response } from 'express';
import { body } from 'express-validator';
import { validationHandler, useCurrentUserHandler, requireAuthHandler } from '@doffy-gittix/common';
import { Ticket } from '../models/ticket.ts';
import { COOKIE_NAME, JWT_KEY } from '../config.ts';

const router = express.Router();
const getCurrentUserHandler = useCurrentUserHandler({
  cookieName: COOKIE_NAME,
  jwtKey: JWT_KEY,
});

router.post(
  '/api/tickets',
  [
    body('title').trim().notEmpty().withMessage('required'),
    body('price').trim().notEmpty().withMessage('required'),
  ],
  validationHandler,
  getCurrentUserHandler,
  requireAuthHandler,
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
