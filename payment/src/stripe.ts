import Stripe from 'stripe';
import { STRIPE_KEY } from './config.ts';

export const stripe = new Stripe(STRIPE_KEY, {
  apiVersion: '2026-05-27.dahlia'
});
