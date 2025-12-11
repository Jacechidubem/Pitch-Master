import { analyzeTeam } from './teamAnalysis';

export const compareSquads = (teamA, teamB) => {
  // Convert DB format (array) to Analysis format (object)
  const formatForAnalysis = (dbPlayers) => {
    const state = {};
    dbPlayers.forEach(p => {
      // Check if p.player exists (in case a player was deleted from DB)
      if (p.player) {
        state[p.positionId] = {
          position: p.player.position,
          attributes: p.player.attributes
        };
      }
    });
    return state;
  };

  const statsA = analyzeTeam(formatForAnalysis(teamA.players));
  const statsB = analyzeTeam(formatForAnalysis(teamB.players));

  // Calculate Difference
  const diff = statsA.overall - statsB.overall;

  let winner = null;
  let verdict = "It's a Draw 🤝";
  let reason = "These teams are evenly matched. It will come down to penalties.";

  if (diff > 0) {
    winner = teamA.name;
    verdict = `${teamA.name} Wins! 🏆`;
    
    // Trash Talk Generation
    if (statsA.midfield > statsB.midfield + 5) {
      reason = `${teamB.name} lost the midfield battle completely. ${teamA.name}'s engine room dominated possession.`;
    } else if (statsA.attack > statsB.defense + 10) {
      reason = `${teamB.name}'s defense had nightmares. They couldn't handle the pace and power of ${teamA.name}'s attack.`;
    } else {
      reason = `${teamA.name} simply has better quality players across the pitch. ${teamB.name} needs to hit the transfer market.`;
    }
  } else if (diff < 0) {
    winner = teamB.name;
    verdict = `${teamB.name} Wins! 🏆`;
    
    // Trash Talk Generation (Reverse)
    if (statsB.midfield > statsA.midfield + 5) {
      reason = `${teamA.name} was overrun in midfield. You can't win games without the ball.`;
    } else if (statsB.attack > statsA.defense + 10) {
      reason = `${teamA.name}'s defenders were chasing shadows. ${teamB.name}'s forwards were unplayable.`;
    } else {
      reason = `${teamB.name} showed superior class today. ${teamA.name} looked like a second-division side in comparison.`;
    }
  }

  return { statsA, statsB, winner, verdict, reason };
};