import { BaseError } from './base-error.js'

export class BadRequestError extends BaseError {
  statusCode = 400;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serialize() {
    return [{ message: this.message }]
  }
}
