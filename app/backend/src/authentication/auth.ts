import * as Jwt from 'jsonwebtoken';
import * as Bcrypt from 'bcryptjs';
import UserInterface from '../interfaces/userInterface';
import ValidationErrorHandler from '../helpers/ValidationErrorHandler';
import 'dotenv/config';

export default class Authentication {
  static generateToken(user: UserInterface): string {
    const jwtToken = Jwt
      .sign(
        { data: user },
        process.env.JWT_SECRET as Jwt.Secret,
        { algorithm: 'HS256', expiresIn: '30d' },
      );
    return jwtToken;
  }

  static async passwordAuthentication(password: string, hash: string): Promise<void> {
    const authResult = await Bcrypt.compare(password, hash);
    if (!authResult) throw new ValidationErrorHandler(401, 'Incorrect email or password');
  }
}
