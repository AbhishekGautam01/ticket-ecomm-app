import { CustomError } from './custom-error';
export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  constructor() {
    super();
  }

  serializeError() {
    return [{ message: 'Not Authorized' }];
  }
}
