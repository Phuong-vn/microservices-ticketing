import { BaseError } from './base-error.js'

export class DatabaseConnectionError extends BaseError {
  statusCode = 500;

  constructor() {
    super('database connection error');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serialize() {
    return [{ message: 'database connection error' }]
  }
}
