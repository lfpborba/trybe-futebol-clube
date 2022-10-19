import { Request } from 'express';
import UserInterface from './userInterface';

export default interface CustomRequest extends Request {
  user?: UserInterface;
}
