import * as Jwt from 'jsonwebtoken';
import * as Bcrypt from 'bcryptjs';
import UserInterface from '../interfaces/userInterface';
import 'dotenv/config';

export default class Authentication {
  static generateToken = (user: UserInterface): string => {
    const token = Jwt.sign(
      user,
      process.env.JWT_SECRET as Jwt.Secret,
      { algorithm: 'HS256', expiresIn: '30d' },
    );
    return token;
  };

  static passwordAuthentication = async (password: string, hash: string) => {
    Bcrypt.compare(password, hash, (err, _res) => {
      if (err) throw new Error('INCORRECT_PASSWORD');
    });
  };
}