import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';
export class RequestValidationError extends Error {
  statusCode = 400;
  constructor(public error: ValidationError[]) {
    super();
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.error.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
