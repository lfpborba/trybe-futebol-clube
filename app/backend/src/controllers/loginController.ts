import { Request, Response } from 'express';
import LoginService from '../services/loginServices';

export default class LoginController {
  private _LoginService: LoginService;

  constructor() {
    this._LoginService = new LoginService();
  }

  login = async (_req: Request, res: Response) => {
    const users = await this._LoginService.login();
    return res.status(200).json(users);
  };
}
