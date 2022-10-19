import ValidationErrorHandler from './ValidationErrorHandler';

export default class LoginDTO {
  private _email: string;
  private _password: string;

  constructor(email: string, password: string) {
    this._email = email;
    this._password = password;

    this.validateEmail();
    this.validatePassword();
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  private validateEmail(): void {
    const email = this._email;
    if (!email || email === '') throw new ValidationErrorHandler(400, 'All fields must be filled');
  }

  private validatePassword(): void {
    const password = this._password;
    if (!password || password === '') {
      throw new ValidationErrorHandler(400, 'All fields must be filled');
    }
  }
}
