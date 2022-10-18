import UserModel from '../database/models/user';

export default class LoginService {
  private _UserModel: typeof UserModel;

  constructor() {
    this._UserModel = UserModel;
  }

  login = async () => {
    const users = await this._UserModel.findAll();
    return users;
  };
}
