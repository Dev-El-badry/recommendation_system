import { CustomError } from './custom-error';

export class AppError extends CustomError {
  public statusCode: number = 422;
  public reason: string = 'not available at that moment !';
  public id: string = '';
  public constructor(reason: string, statusCode: number = 422, id: string = '') {
    super('not available at that moment !');
    this.reason = reason;
    this.id = id;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  public serializeErrors() {
    if (this.id) {
      return [{ message: this.reason, id: this.id }];
    }
    return [{ message: this.reason }];
  }
}
