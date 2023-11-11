import { CustomError } from './custom-error';

export class NoAuthorizedError extends CustomError {
  public statusCode: number = 401;
  public reason: string = 'not allowed to be here';
  public constructor() {
    super('not allowed to be here');

    Object.setPrototypeOf(this, NoAuthorizedError.prototype);
  }

  public serializeErrors() {
    return [{ message: this.reason }];
  }
}
