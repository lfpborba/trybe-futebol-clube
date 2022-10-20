import { Request, Response } from 'express';
import LeaderServices from '../services/leaderbordServices';

class LeaderController {
  service = new LeaderServices();

  public leaderBoard = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.service.homeLeader();

    return res.status(200).json(result);
  };
}

export default LeaderController;
