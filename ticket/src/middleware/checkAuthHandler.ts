import type { Request, Response, NextFunction } from 'express';
import { useCurrentUserHandler, requireAuthHandler } from '@doffy-gittix/common';
import { COOKIE_NAME, JWT_KEY } from '../config.ts';

const getCurrentUserHandler = useCurrentUserHandler({
  cookieName: COOKIE_NAME,
  jwtKey: JWT_KEY,
});

export const checkAuthHandler = [getCurrentUserHandler, requireAuthHandler];
