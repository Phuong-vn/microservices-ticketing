import { Publisher, Subject } from '@doffy-gittix/common';

export class OrderCreatedPublisher extends Publisher<Subject.OrderCreated> {
  readonly subject = Subject.OrderCreated;
}
