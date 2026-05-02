import type { ValidationError } from 'express-validator';
import { BaseError } from './base-error.ts'

export class RequestValidationError extends BaseError {
  statusCode = 400;
  errors: ValidationError[];
  constructor(errors: ValidationError[]) {
    super('validation error');
    this.errors = errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serialize() {
    return this.errors.map((error) => {
      return error.type === 'field'
        ? {
            message: error.msg as string,
            field: error.path,
          }
        : { message: error.msg as string };
    });
  }
}
