import { Request, Response } from 'express';
import TeamsServices from '../services/teamServices';

export default class TeamsController {
  static async getAll(_req: Request, res: Response) {
    const teams = await TeamsServices.getAll()

    return res.status(200).json(teams);
  }
}