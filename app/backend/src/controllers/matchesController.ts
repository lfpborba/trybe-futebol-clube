import { Request, Response } from 'express';
import MatchesServices from '../services/matchesServices';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const matches = await MatchesServices.getAll();

    return res.status(200).json(matches);
  }
}
