import express from 'express';
import type { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validationHandler } from '../middleware/validation-handler.ts';
import { User } from '../models/user.ts';
import { UnauthorizedError } from '../errors/index.ts';
import { COOKIE_NAME, JWT_KEY } from '../config.ts';
import { Password } from '../service/password.ts';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('invalid email type'),
    body('password').trim().notEmpty().withMessage('required'),
  ],
  validationHandler,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthorizedError();
    }

    const isPasswordMatch = await Password.compare(user.password, password);
    if (!isPasswordMatch) {
      throw new UnauthorizedError();
    }

    const currentUser = { id: user._id, email: user.email };

    const token = jwt.sign(currentUser, JWT_KEY!);
    req.session = {
      [COOKIE_NAME]: token,
    };

    return res.send(currentUser);
  },
);

export { router as signinRouter };
