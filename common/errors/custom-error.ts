export abstract class CustomError extends Error {
  public abstract statusCode: number;
  public constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
    // Error.captureStackTrace(this, this.constructor);
  }
  public abstract serializeErrors(): { message: string; field?: string }[];
}