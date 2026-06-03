export enum Subject {
  TicketCreated = 'ticket:created',
  OrderUpdated = 'order:updated',
}

export type Data = {
  [Subject.TicketCreated]: {
    id: string;
    title: string;
    price: string;
  },
  [Subject.OrderUpdated]: {
    id: string,
    userId: string,
    ticketId: string,
  },
}
