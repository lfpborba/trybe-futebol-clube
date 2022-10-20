import TeamInterface from '../interfaces/teamInterface';
import MatchInterface from '../interfaces/matchInterface';
import TeamResultsInterface from '../interfaces/teamResultsInterface';

const Default = {
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '0.00',
};

export default class TeamResults {
  private _name: string;
  private _matches: MatchInterface[];
  private _homeMatches: MatchInterface[];
  private _awayMatches: MatchInterface[];
  private _generalResults: TeamResultsInterface;
  private _homeResults: TeamResultsInterface;
  private _awayResults: TeamResultsInterface;

  constructor(team: TeamInterface, matches: MatchInterface[]) {
    this._name = team.teamName;
    this._matches = matches.filter(({ teamHome, teamAway, inProgress }) => (
      (teamHome?.teamName === this._name || teamAway?.teamName === this._name)
      && inProgress === false
    ));
    this._homeMatches = this._matches.filter(({ teamHome }) => teamHome?.teamName === this._name);
    this._awayMatches = this._matches.filter(({ teamAway }) => teamAway?.teamName === this._name);
    this._generalResults = { name: this._name, ...Default };
    this._homeResults = { name: this._name, ...Default };
    this._awayResults = { name: this._name, ...Default };
    this.calculateHomeResults();
  }

  private calculateHomeResults(): void {
    this._homeMatches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      this._homeResults.totalGames += 1;
      this._homeResults.goalsFavor += homeTeamGoals;
      this._homeResults.goalsOwn += awayTeamGoals;
      this._homeResults.goalsBalance += (homeTeamGoals - awayTeamGoals);
      if (homeTeamGoals > awayTeamGoals) {
        this._homeResults.totalPoints += 3;
        this._homeResults.totalVictories += 1;
      }
      if (homeTeamGoals < awayTeamGoals) {
        this._homeResults.totalLosses += 1;
      }
      if (homeTeamGoals === awayTeamGoals) {
        this._homeResults.totalPoints += 1;
        this._homeResults.totalDraws += 1;
      }
      this.calculateEfficiency();
    });
  }

  private calculateEfficiency() {
    this._homeResults.efficiency = (
      ((this._homeResults.totalPoints / (this._homeResults.totalGames * 3)) * 100).toFixed(2)
    );
  }

  public get homeResults() {
    return { ...this._homeResults };
  }
}
