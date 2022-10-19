import { Request, Response } from 'express';
import MatchesServices from '../services/matchesServices';

export default class MatchesController {
  static async getAll(_req: Request, res: Response) {
    const matches = await MatchesServices.getAll();

    return res.status(200).json(matches);
  }

  static async create(req: Request, res: Response) {
    const matchData = req.body;
    const createdMatch = await MatchesServices.create(matchData);
    return res.status(201).json(createdMatch);
  }

  static async updatedMatch(req: Request, res: Response) {
    const matchUpdated = { id: Number(req.params.id), ...req.body };
    await MatchesServices.updateMatch(matchUpdated);

    return res.status(200).json({ message: 'Match updated successfully' });
  }

  static async finish(req: Request, res: Response) {
    const { id } = req.params;
    await MatchesServices.finish(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }
}
