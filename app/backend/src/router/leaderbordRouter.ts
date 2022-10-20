import { Router } from 'express';
import leaderbordController from '../controllers/leaderbordController';

const leaderbordRouter = Router();

leaderbordRouter.get('/home', leaderbordController.getHomeLeaderbord);

export default leaderbordRouter;
