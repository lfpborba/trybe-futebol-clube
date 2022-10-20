/* eslint-disable @typescript-eslint/no-explicit-any */
import calculate from '../helpers/calculate';
import orderBoard from '../helpers/orderboard';
import ScoreleaderInterface from '../interfaces/leaderboardInterface';
import Matches from '../database/models/match';
import Teams from '../database/models/team';

class LeaderService {
  getAllTeams = async (): Promise<any> => {
    const result = await Teams.findAll({
      include: [{
        model: Matches,
        association: 'teamHome',
        where: { inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
      }],
    });
    return result;
  };

  homeLeader = async (): Promise<ScoreleaderInterface[]> => {
    const allTeams = await this.getAllTeams();

    const board = (allTeams.map((team: any) => ({
      name: team.teamName,
      totalPoints: calculate.points(team),
      totalGames: calculate.games(team),
      totalVictories: calculate.victories(team),
      totalDraws: calculate.draws(team),
      totalLosses: calculate.losses(team),
      goalsFavor: calculate.favorGoals(team),
      goalsOwn: calculate.ownGoals(team),
      goalsBalance: (calculate.favorGoals(team) - calculate.ownGoals(team)),
      efficiency: Number((calculate.points(team) / (calculate.games(team) * 3)) * 100).toFixed(2),
    })));

    const orderlyBoard = orderBoard(board);

    return orderlyBoard as unknown as ScoreleaderInterface[];
  };
}

export default LeaderService;
