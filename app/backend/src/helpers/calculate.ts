/* eslint-disable @typescript-eslint/no-explicit-any */
const calculate = {
  points: (teams: any) => {
    let totalPoints = 0;
    teams.teamHome.forEach((goals: any) => {
      if (goals.homeTeamGoals > goals.awayTeamGoals) totalPoints += 3;
      if (goals.homeTeamGoals === goals.awayTeamGoals) totalPoints += 1;
    });
    return totalPoints;
  },

  games: (teams: any) => {
    const totalGames = teams.teamHome.length;
    return totalGames;
  },

  victories: (teams: any) => {
    let totalVictories = 0;
    teams.teamHome.forEach((goals: any) => {
      if (goals.homeTeamGoals > goals.awayTeamGoals) totalVictories += 1;
    });
    return totalVictories;
  },

  draws: (teams: any) => {
    let totalDraws = 0;
    teams.teamHome.forEach((goals: any) => {
      if (goals.homeTeamGoals === goals.awayTeamGoals) totalDraws += 1;
    });
    return totalDraws;
  },

  losses: (teams: any) => {
    let totalLosses = 0;
    teams.teamHome.forEach((goals: any) => {
      if (goals.homeTeamGoals < goals.awayTeamGoals) totalLosses += 1;
    });
    return totalLosses;
  },

  favorGoals: (teams: any) => {
    let totalFavGoals = 0;
    teams.teamHome.forEach((goals: any) => {
      totalFavGoals += goals.homeTeamGoals;
    });
    return totalFavGoals;
  },

  ownGoals: (teams: any) => {
    let totalOwnGoals = 0;
    teams.teamHome.forEach((goals: any) => {
      totalOwnGoals += goals.awayTeamGoals;
    });
    return totalOwnGoals;
  },
};

export default calculate;
