/* eslint-disable @typescript-eslint/no-explicit-any */
const calculate = {
  hPoints: (teams: any) => {
    let homePoints = 0;
    teams.teamHome.forEach((goals: any) => {
      if (goals.homeTeamGoals > goals.awayTeamGoals) homePoints += 3;
      if (goals.homeTeamGoals === goals.awayTeamGoals) homePoints += 1;
    });
    return homePoints;
  },
  aPoints: (teams: any) => {
    let awayPoints = 0;
    teams.teamAway.forEach((goals: any) => {
      if (goals.awayTeamGoals > goals.homeTeamGoals) awayPoints += 3;
      if (goals.awayTeamGoals === goals.homeTeamGoals) awayPoints += 1;
    });
    return awayPoints;
  },

  tPoints: (teams: any) => {
    let totalPoints = 0;
    teams.teamHome.forEach((goals: any) => {
      if (goals.homeTeamGoals > goals.awayTeamGoals) totalPoints += 3;
      if (goals.homeTeamGoals === goals.awayTeamGoals) totalPoints += 1;
    });
    teams.teamAway.forEach((goals: any) => {
      if (goals.awayTeamGoals > goals.homeTeamGoals) totalPoints += 3;
      if (goals.awayTeamGoals === goals.homeTeamGoals) totalPoints += 1;
    });
    return totalPoints;
  },

  hGames: (teams: any) => {
    const hGames = teams.teamHome.length;
    return hGames;
  },
  aGames: (teams: any) => {
    const aGames = teams.teamAway.length;
    return aGames;
  },
  homeVictories: (teams: any) => {
    let hVictories = 0;
    teams.teamHome.forEach((goals: any) => {
      if (goals.homeTeamGoals > goals.awayTeamGoals) hVictories += 1;
    });
    return hVictories;
  },
  awayVictories: (teams: any) => {
    let aVictories = 0;
    teams.teamAway.forEach((goals: any) => {
      if (goals.awayTeamGoals > goals.homeTeamGoals) aVictories += 1;
    });
    return aVictories;
  },
  homeDraws: (teams: any) => {
    let hDraws = 0;
    teams.teamHome.forEach((goals: any) => {
      if (goals.homeTeamGoals === goals.awayTeamGoals) hDraws += 1;
    });
    return hDraws;
  },
  awayDraws: (teams: any) => {
    let aDraws = 0;
    teams.teamAway.forEach((goals: any) => {
      if (goals.awayTeamGoals === goals.homeTeamGoals) aDraws += 1;
    });
    return aDraws;
  },
  homeLosses: (teams: any) => {
    let hLosses = 0;
    teams.teamHome.forEach((goals: any) => {
      if (goals.homeTeamGoals < goals.awayTeamGoals) hLosses += 1;
    });
    return hLosses;
  },
  awayLosses: (teams: any) => {
    let aLosses = 0;
    teams.teamAway.forEach((goals: any) => {
      if (goals.awayTeamGoals < goals.homeTeamGoals) aLosses += 1;
    });
    return aLosses;
  },
  homeGoals: (teams: any) => {
    let hGoals = 0;
    teams.teamHome.forEach((goals: any) => {
      hGoals += goals.homeTeamGoals;
    });
    return hGoals;
  },
  awayGoals: (teams: any) => {
    let aGoals = 0;
    teams.teamAway.forEach((goals: any) => {
      aGoals += goals.awayTeamGoals;
    });
    return aGoals;
  },
  homeOwnGoals: (teams: any) => {
    let hOwnGoals = 0;
    teams.teamHome.forEach((goals: any) => {
      hOwnGoals += goals.awayTeamGoals;
    });
    return hOwnGoals;
  },
  awayOwnGoals: (teams: any) => {
    let aOwnGoals = 0;
    teams.teamAway.forEach((goals: any) => {
      aOwnGoals += goals.homeTeamGoals;
    });
    return aOwnGoals;
  },
};
export default calculate;
