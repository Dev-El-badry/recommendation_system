import { CustomError } from './custom-error';
import { ValidationError } from 'express-validator';

export class RequestValidationError extends CustomError {
  public statusCode: number = 400;
  public constructor(public error: ValidationError[]) {
    super('invalid request param !');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  public serializeErrors() {
    const formattedError = this.error.map((error) => {
      return { message: error.msg, field: error.param };
    });

    return formattedError;
  }
}
