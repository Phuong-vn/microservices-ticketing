import express from 'express';
import { getCurrentUserHandler } from '../middleware/get-current-user-handler.ts';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  getCurrentUserHandler,
  (req, res) => {
    return res.send({ currentUser: req.currentUser });
  },
);

export { router as currentUserRouter };
