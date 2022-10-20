import { Router } from 'express';
import LeaderController from '../leaderboard/leaderboardController';

const leaderRoute = Router();
const controller = new LeaderController();

leaderRoute.get('/', controller.board);
leaderRoute.get('/home', controller.homeBoard);
leaderRoute.get('/away', controller.awayBoard);

export default leaderRoute;