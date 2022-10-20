import TeamsService from './teamServices';
import MatchesService from './matchesServices';
import TeamResults from '../helpers/teamResultData';
import MatchInterface from '../interfaces/matchInterface';
import TeamResultsInterface from '../interfaces/teamResultsInterface';

export default class LeaderboardService {
  public static async getHomeLeaderbord(): Promise<TeamResultsInterface[]> {
    const teams = await TeamsService.getAll();
    const matches = await MatchesService.getAll();

    const homeLeaderbord = teams.map((team) => {
      const teamResults = new TeamResults(team, matches as unknown as MatchInterface[]);
      return teamResults.homeResults;
    });
    
    return LeaderboardService.sortResults(homeLeaderbord);
  }

  private static sortResults(leaderboard: TeamResultsInterface[]) {
    return leaderboard.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            if (a.goalsFavor === b.goalsFavor) {
              return a.goalsOwn - b.goalsOwn;
            }
            return b.goalsFavor - a.goalsFavor;
          }
          return b.goalsBalance - a.goalsBalance;
        }
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });
  }
}
