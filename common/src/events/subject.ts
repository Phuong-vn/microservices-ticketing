export enum Subject {
  TicketCreated = 'ticket:created',
  TicketUpdated = 'ticket:updated',
  OrderUpdated = 'order:updated',
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
  [Subject.OrderUpdated]: {
    id: string,
    userId: string,
    ticketId: string,
  },
}
