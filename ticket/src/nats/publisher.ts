import { Publisher, Subject } from '@doffy-gittix/common';

export class TicketCreatedPublisher extends Publisher<Subject.TicketCreated> {
  readonly subject = Subject.TicketCreated;
}

export class TicketUpdatedPublisher extends Publisher<Subject.TicketUpdated> {
  readonly subject = Subject.TicketUpdated;
}
