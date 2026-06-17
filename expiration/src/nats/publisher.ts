import { Publisher, Subject } from '@doffy-gittix/common';

export class ExpirationCompletePublisher extends Publisher<Subject.ExpirationComplete> {
  readonly subject = Subject.ExpirationComplete;
}
