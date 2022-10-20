import { Router } from 'express';
import LeaderController from '../controllers/leaderbordController';

const leaderRoute = Router();
const controller = new LeaderController();

leaderRoute.get('/home', controller.leaderBoard);

export default leaderRoute;
