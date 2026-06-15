import { OrderStatus } from './types/orderStatus.ts';

export enum Subject {
  TicketCreated = 'ticket:created',
  TicketUpdated = 'ticket:updated',
  OrderCreated = 'order:created',
  OrderCancelled = 'order:cancelled',
}

export type Data = {
  [Subject.TicketCreated]: {
    id: string;
    title: string;
    price: number;
    userId: string;
  },
  [Subject.TicketUpdated]: {
    id: string;
    title: string;
    price: number;
    userId: string;
  },
  [Subject.OrderCreated]: {
    id: string;
    userId: string;
    status: OrderStatus;
    expiredAt: string;
    ticket: {
      id: string;
      price: number;
    };
  },
  [Subject.OrderCancelled]: {
    id: string;
    ticket: {
      id: string;
    };
  },
}
