import { Publisher, Subject } from '@doffy-gittix/common';

export class PaymentCompletePublisher extends Publisher<Subject.PaymentComplete> {
  readonly subject = Subject.PaymentComplete;
}
