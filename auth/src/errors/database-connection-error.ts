import { BaseError } from './base-error.ts'

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
