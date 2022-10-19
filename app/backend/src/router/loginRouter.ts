import { Router } from 'express';
import userAuth from '../middlewares/userAuth';
import LoginController from '../controllers/loginController';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  await LoginController.login(req, res);
});

loginRouter.get('/validate', userAuth.validateToken, LoginController.loginValidate);

export default loginRouter;
