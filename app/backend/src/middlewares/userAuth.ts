import { NextFunction, Response } from 'express';
import * as Jwt from 'jsonwebtoken';
import CustomRequest from '../interfaces/customRequest';
import ValidationErrorHandler from '../helpers/ValidationErrorHandler';
import 'dotenv/config';
import UserInterface from '../interfaces/userInterface';

export default class AuthMiddleware {
  static validateToken(req: CustomRequest, _res: Response, next: NextFunction) {
    const { authorization: token } = req.headers;

    if (!token) throw new ValidationErrorHandler(401, 'Token not found');
    
    Jwt.verify(token, process.env.JWT_SECRET as Jwt.Secret, (err, decoded) => {
      if (err || !decoded) throw new ValidationErrorHandler(401, 'Token must be a valid token');
      req.user = decoded.data as UserInterface;
    });

    next();
  }
}