import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof DatabaseConnectionError) {
    console.log('Handling database connection error');
    return res.status(500).send({ errors: [{ message: err.message }] });
  } else if (err instanceof RequestValidationError) {
    const formattedErrors = err.error.map((error) => {
      return { message: error.msg, field: error.param };
    });
    console.log('Handling request validation error');
    return res.status(400).send({ errors: formattedErrors });
  }
  res.status(400).send({
    errors: [{ message: 'Something went wrong.' }],
  });
};
