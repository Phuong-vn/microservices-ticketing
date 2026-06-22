import Stripe from 'stripe';
import { STRIPE_SK } from '../config.ts';

export const stripeClient = new Stripe(STRIPE_SK, {
  apiVersion: '2026-05-27.dahlia'
});
