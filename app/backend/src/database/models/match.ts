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

TeamModel.belongsTo(MatchModel, { foreignKey: 'home_team' });
TeamModel.belongsTo(MatchModel, { foreignKey: 'away_team' });
MatchModel.hasMany(TeamModel, { foreignKey: 'home_team', as: 'teamHome' });
MatchModel.hasMany(TeamModel, { foreignKey: 'away_team', as: 'teamAway' });

export default MatchModel;
