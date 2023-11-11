import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  public statusCode: number = 400;
  public constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  public serializeErrors() {
    return [{ message: this.message }];
  }
}
