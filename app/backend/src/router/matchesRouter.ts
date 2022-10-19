import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.getAll);

export default matchesRouter;
