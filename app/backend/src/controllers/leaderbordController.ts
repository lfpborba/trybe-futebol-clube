import { Request, Response } from 'express';
import LeaderbordService from '../services/leaderbordServices';

export default class LeaderbordController {
  public static async getHomeLeaderbord(req: Request, res: Response) {
    const homeLeaderbord = await LeaderbordService.getHomeLeaderbord();

    return res.status(200).json(homeLeaderbord);
  }
}
