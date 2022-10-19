import UserInterface from '../interfaces/userInterface';
import UserModel from '../database/models/user';
import Auth from '../authentication/auth';
import LoginData from '../helpers/loginData';
import ValidationErrorHandler from '../helpers/ValidationErrorHandler';

export default class LoginService {
  static async login(email: string, password: string) {
    const loginData = new LoginData(email, password);

    const user = await UserModel.findOne({ where: { email: loginData.email } });

    if (!user) throw new ValidationErrorHandler(401, 'Incorrect email or password');

    await Auth.passwordAuthentication(loginData.password, user.password);

    const token = Auth.generateToken(user as UserInterface);
    return token;
  }
}
