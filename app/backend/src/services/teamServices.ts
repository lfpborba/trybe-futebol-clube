import TeamInterface from '../interfaces/teamInterface';
import TeamModel from '../database/models/team';
import ValidationErrorHandler from 'src/helpers/ValidationErrorHandler';

export default class TeamsServices {
  static async getAll(): Promise<TeamInterface[]> {
    const teams = await TeamModel.findAll();

    return teams;
  }

  static async getById(id: number): Promise<TeamInterface> {
    const team = await TeamModel.findByPk(id);
    if(!team) throw new ValidationErrorHandler(404, 'Team not found')

    return team
  }
}
