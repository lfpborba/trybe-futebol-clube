import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const teamsRouter = Router();

teamsRouter.get('/', TeamsController.getAll);

export default teamsRouter;
