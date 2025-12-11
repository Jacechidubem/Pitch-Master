export const analyzeTeam = (teamState) => {
  const players = Object.values(teamState).filter(p => p !== null);

  let stats = {
    attack: 0,
    midfield: 0,
    defense: 0,
    overall: 0,
    verdict: "Incomplete Squad",
    comment: "Add players to all positions to get a full report."
  };

  if (players.length === 0) return stats;

  let atkSum = 0, midSum = 0, defSum = 0;
  let atkCount = 0, midCount = 0, defCount = 0;

  players.forEach(p => {
    const attr = p.attributes;
    
    // --- SAFETY CHECK ---
    // Defaults to 50 if a stat is missing (e.g. older data without 'vision')
    const safeAttr = (val) => (typeof val === 'number' ? val : 50);

    // --- 1. ATTACKERS ---
    // Includes: Striker (ST), Center Forward (CF), Wingers (LW, RW)
    if (['FWD', 'ST', 'LW', 'RW', 'CF', 'LS', 'RS', 'LF', 'RF'].includes(p.position)) {
      atkSum += (safeAttr(attr.shooting) + safeAttr(attr.pace) + safeAttr(attr.dribbling)) / 3;
      atkCount++;
    } 
    // --- 2. MIDFIELDERS ---
    // Includes: Central (CM), Attacking (CAM), Defensive (CDM), Wide Mids (LM, RM)
    else if (['MID', 'CM', 'CAM', 'CDM', 'LM', 'RM'].includes(p.position)) {
      // SMART LOGIC:
      // - Playmakers (Zidane/KDB) rely on Dribbling.
      // - Enforcers (Keane/Rodri) rely on Defending.
      // We take the HIGHER of the two to be fair to both styles.
      const bestPhysicalTrait = Math.max(safeAttr(attr.dribbling), safeAttr(attr.defending));
      
      // Vision and Passing are mandatory for all mids
      midSum += (safeAttr(attr.passing) + safeAttr(attr.vision) + bestPhysicalTrait) / 3;
      midCount++;
    } 
    // --- 3. DEFENDERS & GK ---
    // Includes: Center Back (CB), Full Backs (LB, RB), Goalkeeper (GK)
    else {
      defSum += (safeAttr(attr.defending) + safeAttr(attr.physical) + safeAttr(attr.pace)) / 3;
      defCount++;
    }
  });

  // Calculate Sector Ratings (Prevent Divide by Zero)
  stats.attack = atkCount ? Math.round(atkSum / atkCount) : 0;
  stats.midfield = midCount ? Math.round(midSum / midCount) : 0;
  stats.defense = defCount ? Math.round(defSum / defCount) : 0;
  
  // --- OVERALL RATING ---
  // STRICT MATH: Always divide by 3 sectors.
  // This penalizes incomplete teams (e.g. 90 Midfield / 3 = 30 Overall).
  stats.overall = Math.round((stats.attack + stats.midfield + stats.defense) / 3);

  // --- VERDICT LOGIC ---
  
  // 1. Missing Sectors Check
  if (stats.defense === 0 || stats.midfield === 0 || stats.attack === 0) {
    stats.verdict = "Building... 🏗️";
    stats.comment = "Your squad is incomplete. You need players in Attack, Midfield, and Defense to compete.";
  } 
  // 2. Elite Tier
  else if (stats.overall > 88) {
    stats.verdict = "World Class 🌍";
    stats.comment = "An absolutely frightening squad. You have the quality to dominate Europe.";
  } 
  // 3. Imbalanced (Glass Cannon)
  else if (stats.defense < 70 && stats.attack > 85) {
    stats.verdict = "Glass Cannon 🔫";
    stats.comment = "You'll score 4 goals but concede 5. Your defense is non-existent.";
  } 
  // 4. Imbalanced (Park the Bus)
  else if (stats.attack < 75 && stats.defense > 80) {
    stats.verdict = "Parking the Bus 🚌";
    stats.comment = "Solid at the back, but toothless up front. You're playing for a 0-0 draw.";
  } 
  // 5. Solid Tier
  else if (stats.overall > 82) {
    stats.verdict = "Solid Contender 💪";
    stats.comment = "A strong team that can fight for the top 4.";
  } 
  // 6. Average Tier
  else {
    stats.verdict = "Mid-Table Quality 😐";
    stats.comment = "A decent squad, but lacks the X-factor to win major trophies.";
  }

  return stats;
};