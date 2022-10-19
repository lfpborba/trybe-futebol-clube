import { FindOptions } from 'sequelize';
import TeamModel from '../database/models/team';
import MatchesModel from '../database/models/match';

const findAllOptions: FindOptions = {
  include: [
    { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
    { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
  ],
};

export default class MatchesServices {
  static async getAll() {
    const matches = await MatchesModel.findAll(findAllOptions);

    return matches;
  }
}
