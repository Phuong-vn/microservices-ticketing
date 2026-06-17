import { OrderStatus } from './types/orderStatus.ts';

export enum Subject {
  TicketCreated = 'ticket:created',
  TicketUpdated = 'ticket:updated',
  OrderCreated = 'order:created',
  OrderCancelled = 'order:cancelled',
  OrderExpired = 'order:expired',
}

export type Data = {
  [Subject.TicketCreated]: {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
    orderId?: string | undefined;
  },
  [Subject.TicketUpdated]: {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
    orderId?: string | undefined;
  },
  [Subject.OrderCreated]: {
    id: string;
    userId: string;
    status: OrderStatus;
    expiredAt: string;
    version: number;
    ticket: {
      id: string;
      price: number;
    };
  },
  [Subject.OrderCancelled]: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  },
  [Subject.OrderExpired]: {
    id: string;
  },
}
