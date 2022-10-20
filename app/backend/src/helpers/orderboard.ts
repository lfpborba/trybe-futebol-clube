import ScoreleaderInterface from '../interfaces/leaderboardInterface';

const orderBoard = (board: ScoreleaderInterface[]) => {
  const sort = board.sort((a, b) =>
    b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  return sort as unknown as ScoreleaderInterface[];
};

export default orderBoard;
