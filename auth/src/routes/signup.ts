import express from 'express';
import type { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/index.ts';
import { User } from '../models/user.ts';
import { validationHandler } from '../middleware/validation-handler.ts';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('invalid email type'),
    body('password')
      .isLength({ min: 4, max: 20 })
      .withMessage('password must have 4-20 characters'),
  ],
  validationHandler,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    res.status(201).send({
      id: user._id,
      email: user.email,
    });
  },
);

export { router as signupRouter };
