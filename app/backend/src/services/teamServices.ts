import TeamInterface from '../interfaces/teamInterface';
import TeamModel from '../database/models/team';

export default class TeamsServices {
  static async getAll(): Promise<TeamInterface[]> {
    const teams = await TeamModel.findAll();

    return teams;
  }
}
