import ValidationErrorHandler from '../helpers/ValidationErrorHandler';
import TeamInterface from '../interfaces/teamInterface';
import TeamModel from '../database/models/team';

export default class TeamsServices {
  static async getAll(): Promise<TeamInterface[]> {
    const teams = await TeamModel.findAll();

    return teams;
  }

  static async getById(id: number): Promise<TeamInterface> {
    const team = await TeamModel.findByPk(id);
    if (!team) throw new ValidationErrorHandler(404, 'Team not found');

    return team;
  }

  static async getAllIds(): Promise<number[]> {
    const teamsIds = await TeamModel.findAll();
    const idsData = teamsIds.map((team) => team.id);

    return idsData as number[];
  }
}
