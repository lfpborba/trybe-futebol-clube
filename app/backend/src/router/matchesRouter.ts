import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import Auth from '../middlewares/userAuth';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.getAll);
matchesRouter.post('/', Auth.validateToken, MatchesController.create)

export default matchesRouter;
