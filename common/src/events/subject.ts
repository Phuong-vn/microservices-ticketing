export enum Subject {
  TicketCreated = 'ticket:created',
  TicketUpdated = 'ticket:updated',
  OrderCreated = 'order:created',
}

export type Data = {
  [Subject.TicketCreated]: {
    id: string;
    title: string;
    price: string;
    userId: string;
  },
  [Subject.TicketUpdated]: {
    id: string;
    title: string;
    price: string;
    userId: string;
  },
  [Subject.OrderCreated]: {
    id: string,
    userId: string,
    ticketId: string,
  },
}
