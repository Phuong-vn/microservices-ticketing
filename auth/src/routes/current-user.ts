import express from 'express';
import { COOKIE_NAME, JWT_KEY } from '../config.ts';
import { useCurrentUserHandler } from '@doffy-gittix/common';

const router = express.Router();

const getCurrentUserHandler = useCurrentUserHandler({
  cookieName: COOKIE_NAME ?? '',
  jwtKey: JWT_KEY ?? '',
});

router.get('/api/users/currentuser', getCurrentUserHandler, (req, res) => {
  return res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
