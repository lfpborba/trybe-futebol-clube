export default class ValidationErrorHandler extends Error {
  private _statusCode: number;
  private _message: string;

  constructor(statusCode: number, message: string) {
    super();
    this._statusCode = statusCode;
    this._message = message;
  }

  public get statusCode(): number {
    return this._statusCode;
  }

  public get message(): string {
    return this._message;
  }
}
