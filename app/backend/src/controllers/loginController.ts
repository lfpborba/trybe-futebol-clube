import { Request, Response } from 'express';
import CustomRequest from '../interfaces/customRequest';
import LoginService from '../services/loginServices';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    
    const token = await LoginService.login(email, password);

    return res.status(200).json({ token });
  }

  static loginValidate(req: CustomRequest, res: Response) {
    const { user } = req;
    
    return res.status(200).json({ role: user?.role });
  }
}
