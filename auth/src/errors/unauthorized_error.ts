import { BaseError } from './base-error.ts';

export class UnauthorizedError extends BaseError {
  statusCode = 401;

  constructor() {
    super('Unauthorized');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serialize() {
    return [{ message: 'Unauthorized' }];
  }
}
