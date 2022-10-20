import { Request, Response } from 'express';
import LeaderService from './leaderboardServices';

class LeaderController {
  service = new LeaderService();
  public homeBoard = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.service.homeLeader();
    return res.status(200).json(result);
  };

  public awayBoard = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.service.awayLeader();
    return res.status(200).json(result);
  };

  public board = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.service.leader();
    return res.status(200).json(result);
  };
}

export default LeaderController;
