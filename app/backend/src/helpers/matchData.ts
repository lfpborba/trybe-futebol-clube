import MatchInterface from '../interfaces/matchInterface';
import ValidationErrorHandler from './ValidationErrorHandler'
import TeamsService from '../services/teamServices';

export default class Match {
  private _homeTeam: number;
  private _awayTeam: number;
  private _homeTeamGoals: number;
  private _awayTeamGoals: number;
  private _inProgress: boolean;

  constructor(matchData: MatchInterface) {
    const {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    } = matchData;

    this._homeTeam = homeTeam;
    this._awayTeam = awayTeam;
    this._homeTeamGoals = homeTeamGoals;
    this._awayTeamGoals = awayTeamGoals;
    this._inProgress = inProgress || true;
  }

  public async validateTeams(): Promise<void> {
    const homeTeam = this._homeTeam;
    const awayTeam = this._awayTeam;

    if (homeTeam === awayTeam) {
      throw new ValidationErrorHandler(401, 'It is not possible to create a match with two equal teams');
    }

    const teamsIds = await TeamsService.getAllIds();
    if (!(teamsIds.includes(homeTeam)) || !(teamsIds.includes(awayTeam))) {
      throw new ValidationErrorHandler(404, 'There is no team with such id!');
    }
  }

  public get allAttributes() {

    return {
      homeTeam: this._homeTeam,
      awayTeam: this._awayTeam,
      homeTeamGoals: this._homeTeamGoals,
      awayTeamGoals: this._awayTeamGoals,
      inProgress: this._inProgress,
    };
  }
}
