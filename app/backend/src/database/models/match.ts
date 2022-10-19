import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './team';

class MatchModel extends Model {
  id?: number;
  teamName: string;
}

MatchModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    field: 'home_team',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    field: 'away_team',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
TeamModel.hasMany(MatchModel, { foreignKey: 'homeTeam', as: 'homeMatches' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });
TeamModel.hasMany(MatchModel, { foreignKey: 'awayTeam', as: 'awayMatches' });

export default MatchModel;
