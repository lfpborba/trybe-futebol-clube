import ValidationErrorHandler from './ValidationErrorHandler';

export default class LoginDTO {
  private _email: string;
  private _password: string;

  constructor(email: string, password: string) {
    if (!email || email === '') throw new ValidationErrorHandler(400, 'All fields must be filled');

    this._email = email;
    this._password = password;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }
}
