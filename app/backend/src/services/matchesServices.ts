import { FindOptions } from 'sequelize';
import TeamModel from '../database/models/team';
import MatchesModel from '../database/models/match';
import MatchInterface from '../interfaces/matchInterface';
import MatchData from '../helpers/matchData';

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

  static async create(matchData: MatchInterface) {
    const match = new MatchData(matchData);
    await match.validateTeams();

    const createdMatch = await MatchesModel.create(match.allAttributes);

    return createdMatch;
  }
}
