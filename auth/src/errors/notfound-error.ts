import { BaseError } from './base-error.ts'

export class NotFoundError extends BaseError {
  statusCode = 404;

  constructor() {
    super('not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize() {
    return [{ message: 'not found' }]
  }
}
