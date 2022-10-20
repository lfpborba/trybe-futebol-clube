/* eslint-disable @typescript-eslint/no-explicit-any */
import calculate from './calculate';
import orderboard from './orderboard';
import ILeader from './leaderInterface';
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
      }, {
        model: Matches,
        association: 'teamAway',
        where: { inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
      }],
    });
    return result;
  };

  homeLeader = async (): Promise<ILeader[]> => {
    const allTeams = await this.getAllTeams();
    const homeBoard = (allTeams.map((team: any) => ({
      name: team.teamName,
      totalPoints: calculate.hPoints(team),
      totalGames: calculate.hGames(team),
      totalVictories: calculate.homeVictories(team),
      totalDraws: calculate.homeDraws(team),
      totalLosses: calculate.homeLosses(team),
      goalsFavor: calculate.homeGoals(team),
      goalsOwn: calculate.homeOwnGoals(team),
      goalsBalance: calculate.homeGoals(team) - calculate.homeOwnGoals(team),
      efficiency: Number((calculate.hPoints(team) / (calculate.hGames(team) * 3)) * 100).toFixed(2),
    })));

    const orderlyHomeBoard = orderboard(homeBoard);
    return orderlyHomeBoard as unknown as ILeader[];
  };

  awayLeader = async (): Promise<ILeader[]> => {
    const allTeams = await this.getAllTeams();
    const awayBoard = (allTeams.map((team: any) => ({
      name: team.teamName,
      totalPoints: calculate.aPoints(team),
      totalGames: calculate.aGames(team),
      totalVictories: calculate.awayVictories(team),
      totalDraws: calculate.awayDraws(team),
      totalLosses: calculate.awayLosses(team),
      goalsFavor: calculate.awayGoals(team),
      goalsOwn: calculate.awayOwnGoals(team),
      goalsBalance: calculate.awayGoals(team) - calculate.awayOwnGoals(team),
      efficiency: Number((calculate.aPoints(team) / (calculate.aGames(team) * 3)) * 100).toFixed(2),
    })));
    const orderlyAwayBoard = orderboard(awayBoard);

    return orderlyAwayBoard as unknown as ILeader[];
  };

  leader = async (): Promise<ILeader[]> => {
    const allTeams = await this.getAllTeams();

    const board = (allTeams.map((team: any) => ({
      name: team.teamName,
      totalPoints: calculate.tPoints(team),
      totalGames: calculate.hGames(team) + calculate.aGames(team),
      totalVictories: calculate.homeVictories(team) + calculate.awayVictories(team),
      totalDraws: calculate.homeDraws(team) + calculate.awayDraws(team),
      totalLosses: calculate.homeLosses(team) + calculate.awayLosses(team),
      goalsFavor: calculate.homeGoals(team) + calculate.awayGoals(team),
      goalsOwn: calculate.homeOwnGoals(team) + calculate.awayOwnGoals(team),
      goalsBalance: ((calculate.homeGoals(team) + calculate.awayGoals(team))
      - (calculate.homeOwnGoals(team) + calculate.awayOwnGoals(team))),
      efficiency: Number((calculate.tPoints(team)
      / ((calculate.hGames(team) + calculate.aGames(team)) * 3)) * 100).toFixed(2),
    })));

    const orderlyBoard = orderboard(board);

    return orderlyBoard as unknown as ILeader[];
  };
}

export default LeaderService;
