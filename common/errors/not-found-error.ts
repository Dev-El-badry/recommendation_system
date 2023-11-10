import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  public statusCode: number = 404;
  private reason: string = 'not available at that moment !';
  public constructor() {
    super('not available at that moment !');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  public serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{ message: this.reason }];
  }

}