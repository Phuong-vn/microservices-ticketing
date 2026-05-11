import express from 'express';
import { COOKIE_KEY, JWT_KEY } from '../config.ts';
import { useCurrentUserHandler } from '@doffy-gittix/common';

const router = express.Router();

const getCurrentUserHandler = useCurrentUserHandler({
  COOKIE_KEY: COOKIE_KEY ?? '',
  JWT_KEY: JWT_KEY ?? '',
});

router.get('/api/users/currentuser', getCurrentUserHandler, (req, res) => {
  return res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
