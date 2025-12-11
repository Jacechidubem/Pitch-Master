const players = [
  // =================================================================
  // LEGENDS (ICONS) - The "Invincibles"
  // =================================================================
  { name: "Pelé", position: "CF", team: "Icons", nationality: "Brazil", rating: 98, attributes: { pace: 95, shooting: 96, passing: 93, dribbling: 96, defending: 60, physical: 76, vision: 95 } },
  { name: "Diego Maradona", position: "CAM", team: "Icons", nationality: "Argentina", rating: 97, attributes: { pace: 92, shooting: 94, passing: 95, dribbling: 98, defending: 40, physical: 78, vision: 99 } },
  { name: "Ronaldo Nazário", position: "ST", team: "Icons", nationality: "Brazil", rating: 96, attributes: { pace: 97, shooting: 95, passing: 81, dribbling: 95, defending: 45, physical: 76, vision: 82 } },
  { name: "Zinedine Zidane", position: "CAM", team: "Icons", nationality: "France", rating: 96, attributes: { pace: 85, shooting: 92, passing: 96, dribbling: 95, defending: 75, physical: 86, vision: 98 } },
  { name: "Johan Cruyff", position: "CF", team: "Icons", nationality: "Netherlands", rating: 94, attributes: { pace: 91, shooting: 92, passing: 91, dribbling: 95, defending: 42, physical: 70, vision: 94 } },
  { name: "Ronaldinho", position: "LW", team: "Icons", nationality: "Brazil", rating: 94, attributes: { pace: 91, shooting: 89, passing: 91, dribbling: 97, defending: 37, physical: 81, vision: 96 } },
  { name: "Paolo Maldini", position: "LB", team: "Icons", nationality: "Italy", rating: 94, attributes: { pace: 86, shooting: 60, passing: 75, dribbling: 70, defending: 96, physical: 84, vision: 78 } },
  { name: "Lev Yashin", position: "GK", team: "Icons", nationality: "Russia", rating: 94, attributes: { pace: 60, shooting: 20, passing: 70, dribbling: 20, defending: 96, physical: 85, vision: 65 } },
  { name: "Thierry Henry", position: "ST", team: "Icons", nationality: "France", rating: 93, attributes: { pace: 94, shooting: 91, passing: 83, dribbling: 90, defending: 50, physical: 80, vision: 85 } },
  { name: "Cafu", position: "RB", team: "Icons", nationality: "Brazil", rating: 93, attributes: { pace: 89, shooting: 70, passing: 84, dribbling: 83, defending: 90, physical: 85, vision: 78 } },
  { name: "Roberto Carlos", position: "LB", team: "Icons", nationality: "Brazil", rating: 92, attributes: { pace: 92, shooting: 85, passing: 82, dribbling: 84, defending: 86, physical: 84, vision: 75 } },
  { name: "Fabio Cannavaro", position: "CB", team: "Icons", nationality: "Italy", rating: 92, attributes: { pace: 80, shooting: 40, passing: 65, dribbling: 68, defending: 95, physical: 87, vision: 60 } },
  { name: "Ruud Gullit", position: "CF", team: "Icons", nationality: "Netherlands", rating: 90, attributes: { pace: 85, shooting: 88, passing: 88, dribbling: 87, defending: 80, physical: 88, vision: 90 } },
  { name: "Patrick Vieira", position: "CDM", team: "Icons", nationality: "France", rating: 88, attributes: { pace: 82, shooting: 78, passing: 85, dribbling: 81, defending: 89, physical: 92, vision: 84 } },
  { name: "Roy Keane", position: "CDM", team: "Icons", nationality: "Ireland", rating: 88, attributes: { pace: 75, shooting: 75, passing: 86, dribbling: 78, defending: 90, physical: 93, vision: 88 } },
  { name: "Oliver Kahn", position: "GK", team: "Icons", nationality: "Germany", rating: 92, attributes: { pace: 50, shooting: 30, passing: 60, dribbling: 40, defending: 95, physical: 90, vision: 55 } },
  { name: "David Beckham", position: "RM", team: "Icons", nationality: "England", rating: 89, attributes: { pace: 80, shooting: 85, passing: 95, dribbling: 82, defending: 70, physical: 78, vision: 97 } },

  // =================================================================
  // CURRENT STARS - PREMIER LEAGUE
  // =================================================================
  { name: "Erling Haaland", position: "ST", team: "Man City", nationality: "Norway", rating: 91, attributes: { pace: 89, shooting: 93, passing: 66, dribbling: 80, defending: 45, physical: 88, vision: 65 } },
  { name: "Kevin De Bruyne", position: "CAM", team: "Man City", nationality: "Belgium", rating: 91, attributes: { pace: 72, shooting: 85, passing: 94, dribbling: 87, defending: 65, physical: 78, vision: 96 } },
  { name: "Rodri", position: "CDM", team: "Man City", nationality: "Spain", rating: 91, attributes: { pace: 58, shooting: 73, passing: 86, dribbling: 79, defending: 85, physical: 82, vision: 88 } },
  { name: "Mohamed Salah", position: "RW", team: "Liverpool", nationality: "Egypt", rating: 89, attributes: { pace: 89, shooting: 87, passing: 81, dribbling: 88, defending: 45, physical: 76, vision: 82 } },
  { name: "Virgil van Dijk", position: "CB", team: "Liverpool", nationality: "Netherlands", rating: 89, attributes: { pace: 78, shooting: 60, passing: 71, dribbling: 72, defending: 89, physical: 86, vision: 70 } },
  { name: "Alisson", position: "GK", team: "Liverpool", nationality: "Brazil", rating: 89, attributes: { pace: 50, shooting: 20, passing: 85, dribbling: 50, defending: 90, physical: 85, vision: 70 } },
  { name: "Bukayo Saka", position: "RW", team: "Arsenal", nationality: "England", rating: 87, attributes: { pace: 85, shooting: 83, passing: 82, dribbling: 88, defending: 55, physical: 70, vision: 81 } },
  { name: "Martin Ødegaard", position: "CAM", team: "Arsenal", nationality: "Norway", rating: 87, attributes: { pace: 76, shooting: 80, passing: 89, dribbling: 87, defending: 62, physical: 68, vision: 91 } },
  { name: "William Saliba", position: "CB", team: "Arsenal", nationality: "France", rating: 86, attributes: { pace: 80, shooting: 40, passing: 75, dribbling: 72, defending: 87, physical: 85, vision: 70 } },
  { name: "Declan Rice", position: "CDM", team: "Arsenal", nationality: "England", rating: 87, attributes: { pace: 78, shooting: 70, passing: 82, dribbling: 78, defending: 86, physical: 85, vision: 80 } },
  { name: "Bruno Fernandes", position: "CAM", team: "Man Utd", nationality: "Portugal", rating: 87, attributes: { pace: 75, shooting: 84, passing: 88, dribbling: 83, defending: 65, physical: 74, vision: 92 } },
  { name: "Trent A. Arnold", position: "RB", team: "Liverpool", nationality: "England", rating: 86, attributes: { pace: 76, shooting: 75, passing: 91, dribbling: 78, defending: 76, physical: 70, vision: 94 } },
  { name: "Andrew Robertson", position: "LB", team: "Liverpool", nationality: "Scotland", rating: 86, attributes: { pace: 80, shooting: 62, passing: 82, dribbling: 78, defending: 82, physical: 79, vision: 76 } },
  { name: "Kyle Walker", position: "RB", team: "Man City", nationality: "England", rating: 85, attributes: { pace: 90, shooting: 63, passing: 77, dribbling: 78, defending: 80, physical: 82, vision: 70 } },
  { name: "Son Heung-min", position: "LW", team: "Spurs", nationality: "Korea", rating: 87, attributes: { pace: 87, shooting: 88, passing: 80, dribbling: 86, defending: 42, physical: 70, vision: 80 } },

  // =================================================================
  // CURRENT STARS - LA LIGA
  // =================================================================
  { name: "Kylian Mbappé", position: "ST", team: "Real Madrid", nationality: "France", rating: 91, attributes: { pace: 97, shooting: 90, passing: 80, dribbling: 92, defending: 36, physical: 78, vision: 79 } },
  { name: "Vinícius Jr.", position: "LW", team: "Real Madrid", nationality: "Brazil", rating: 90, attributes: { pace: 95, shooting: 82, passing: 81, dribbling: 90, defending: 29, physical: 68, vision: 80 } },
  { name: "Jude Bellingham", position: "CAM", team: "Real Madrid", nationality: "England", rating: 90, attributes: { pace: 82, shooting: 85, passing: 86, dribbling: 88, defending: 78, physical: 82, vision: 88 } },
  { name: "Thibaut Courtois", position: "GK", team: "Real Madrid", nationality: "Belgium", rating: 90, attributes: { pace: 40, shooting: 20, passing: 65, dribbling: 45, defending: 92, physical: 85, vision: 60 } },
  { name: "Pedri", position: "CM", team: "Barcelona", nationality: "Spain", rating: 86, attributes: { pace: 78, shooting: 70, passing: 88, dribbling: 89, defending: 65, physical: 60, vision: 92 } },
  { name: "Frenkie de Jong", position: "CM", team: "Barcelona", nationality: "Netherlands", rating: 87, attributes: { pace: 81, shooting: 72, passing: 88, dribbling: 89, defending: 76, physical: 74, vision: 88 } },
  { name: "Antoine Griezmann", position: "ST", team: "Atletico", nationality: "France", rating: 88, attributes: { pace: 80, shooting: 88, passing: 87, dribbling: 88, defending: 55, physical: 72, vision: 89 } },
  { name: "Antonio Rüdiger", position: "CB", team: "Real Madrid", nationality: "Germany", rating: 86, attributes: { pace: 82, shooting: 40, passing: 70, dribbling: 66, defending: 86, physical: 90, vision: 60 } },
  { name: "Ferland Mendy", position: "LB", team: "Real Madrid", nationality: "France", rating: 83, attributes: { pace: 92, shooting: 64, passing: 74, dribbling: 78, defending: 80, physical: 84, vision: 70 } },

  // =================================================================
  // CURRENT STARS - BUNDESLIGA
  // =================================================================
  { name: "Harry Kane", position: "ST", team: "Bayern", nationality: "England", rating: 90, attributes: { pace: 69, shooting: 93, passing: 85, dribbling: 83, defending: 49, physical: 83, vision: 88 } },
  { name: "Jamal Musiala", position: "CAM", team: "Bayern", nationality: "Germany", rating: 87, attributes: { pace: 85, shooting: 80, passing: 83, dribbling: 94, defending: 60, physical: 65, vision: 85 } },
  { name: "Joshua Kimmich", position: "CDM", team: "Bayern", nationality: "Germany", rating: 87, attributes: { pace: 70, shooting: 72, passing: 88, dribbling: 84, defending: 82, physical: 75, vision: 90 } },
  { name: "Alphonso Davies", position: "LB", team: "Bayern", nationality: "Canada", rating: 84, attributes: { pace: 95, shooting: 68, passing: 77, dribbling: 84, defending: 76, physical: 75, vision: 72 } },
  { name: "Jeremie Frimpong", position: "RB", team: "Leverkusen", nationality: "Netherlands", rating: 85, attributes: { pace: 94, shooting: 70, passing: 80, dribbling: 86, defending: 75, physical: 70, vision: 78 } },
  { name: "Florian Wirtz", position: "CAM", team: "Leverkusen", nationality: "Germany", rating: 88, attributes: { pace: 82, shooting: 80, passing: 89, dribbling: 90, defending: 50, physical: 65, vision: 92 } },
  { name: "Gregor Kobel", position: "GK", team: "Dortmund", nationality: "Swiss", rating: 87, attributes: { pace: 45, shooting: 20, passing: 70, dribbling: 40, defending: 88, physical: 84, vision: 60 } },

  // =================================================================
  // CURRENT STARS - SERIE A
  // =================================================================
  { name: "Lautaro Martínez", position: "ST", team: "Inter", nationality: "Argentina", rating: 89, attributes: { pace: 86, shooting: 88, passing: 75, dribbling: 87, defending: 48, physical: 84, vision: 78 } },
  { name: "Theo Hernández", position: "LB", team: "Milan", nationality: "France", rating: 87, attributes: { pace: 94, shooting: 76, passing: 80, dribbling: 84, defending: 80, physical: 86, vision: 75 } },
  { name: "Rafael Leão", position: "LW", team: "Milan", nationality: "Portugal", rating: 87, attributes: { pace: 93, shooting: 80, passing: 78, dribbling: 89, defending: 35, physical: 80, vision: 78 } },
  { name: "Paulo Dybala", position: "CF", team: "Roma", nationality: "Argentina", rating: 86, attributes: { pace: 80, shooting: 85, passing: 86, dribbling: 90, defending: 40, physical: 60, vision: 88 } },
  { name: "Alessandro Bastoni", position: "CB", team: "Inter", nationality: "Italy", rating: 86, attributes: { pace: 75, shooting: 40, passing: 82, dribbling: 76, defending: 87, physical: 83, vision: 75 } },

  // =================================================================
  // CURRENT STARS - REST OF WORLD
  // =================================================================
  { name: "Lionel Messi", position: "RW", team: "Inter Miami", nationality: "Argentina", rating: 90, attributes: { pace: 80, shooting: 87, passing: 90, dribbling: 94, defending: 34, physical: 64, vision: 97 } },
  { name: "Cristiano Ronaldo", position: "ST", team: "Al Nassr", nationality: "Portugal", rating: 86, attributes: { pace: 77, shooting: 88, passing: 75, dribbling: 80, defending: 34, physical: 74, vision: 76 } },
  { name: "Neymar Jr", position: "LW", team: "Santos", nationality: "Brazil", rating: 86, attributes: { pace: 82, shooting: 81, passing: 86, dribbling: 93, defending: 35, physical: 60, vision: 90 } },
];

module.exports = players;