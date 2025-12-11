import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import teamService from '../services/teamService';
import { compareSquads } from '../utils/compareLogic';
import TeamRadar from '../components/common/TeamRadar';

const CompareTeams = () => {
  const { user } = useSelector((state) => state.auth);
  const [teams, setTeams] = useState([]);
  const [selectedIdA, setSelectedIdA] = useState("");
  const [selectedIdB, setSelectedIdB] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      if (user) {
        try {
          const data = await teamService.getMyTeams(user.token);
          setTeams(data);
        } catch (error) {
          console.error("Error loading teams");
        }
      }
    };
    fetchTeams();
  }, [user]);

  const handleCompare = () => {
    if (!selectedIdA || !selectedIdB) return;
    if (selectedIdA === selectedIdB) {
      alert("You cannot compare a team against itself!");
      return;
    }

    const teamA = teams.find(t => t._id === selectedIdA);
    const teamB = teams.find(t => t._id === selectedIdB);

    const comparisonResult = compareSquads(teamA, teamB);
    setResult({ ...comparisonResult, teamA, teamB });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark font-display text-white">
      <Navbar />

      <main className="flex-grow px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-center mb-8 uppercase tracking-widest text-primary">Head to Head</h1>

          {/* Selectors */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-10">
            <div className="w-full md:w-1/3">
              <label className="block text-xs uppercase font-bold text-text-secondary mb-2">Home Team</label>
              <select 
                className="w-full bg-surface-dark border border-border-light p-3 rounded text-white focus:border-primary"
                value={selectedIdA}
                onChange={(e) => setSelectedIdA(e.target.value)}
              >
                <option value="">Select Squad...</option>
                {teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-black text-xl italic text-primary">VS</div>
            </div>

            <div className="w-full md:w-1/3">
              <label className="block text-xs uppercase font-bold text-text-secondary mb-2">Away Team</label>
              <select 
                className="w-full bg-surface-dark border border-border-light p-3 rounded text-white focus:border-primary"
                value={selectedIdB}
                onChange={(e) => setSelectedIdB(e.target.value)}
              >
                <option value="">Select Squad...</option>
                {teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>
          </div>

          <div className="text-center mb-10">
            <button 
              onClick={handleCompare}
              disabled={!selectedIdA || !selectedIdB}
              className="bg-primary text-black font-black uppercase tracking-wider py-3 px-8 rounded hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(19,236,109,0.3)] transition-all"
            >
              Simulate Match
            </button>
          </div>

          {/* Result Display */}
          {result && (
            <div className="animate-fade-in space-y-8">
              
              {/* Scoreboard */}
              <div className="bg-[#151f1a] border border-[#2a3b32] rounded-xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                <h2 className="text-4xl font-black text-white mb-2">{result.verdict}</h2>
                <p className="text-text-secondary italic text-lg">"{result.reason}"</p>
              </div>

              {/* Radar Chart */}
              <div className="flex justify-center bg-surface-dark p-6 rounded-xl border border-border-light">
                <div className="w-full max-w-[500px]">
                  <TeamRadar 
                    statsA={result.statsA} 
                    statsB={result.statsB} 
                    nameA={result.teamA.name} 
                    nameB={result.teamB.name} 
                  />
                </div>
              </div>

              {/* Stat Comparison Table */}
              <div className="grid grid-cols-3 gap-4 items-center bg-surface-dark p-6 rounded-xl border border-border-light text-sm md:text-base">
                {/* Team A Stats */}
                <div className="text-right space-y-4">
                  <div className="font-bold text-lg truncate">{result.teamA.name}</div>
                  <div className="text-3xl font-black text-white">{result.statsA.overall}</div>
                  <div className={result.statsA.attack > result.statsB.attack ? 'text-green-400 font-bold' : 'text-text-secondary'}>{result.statsA.attack}</div>
                  <div className={result.statsA.midfield > result.statsB.midfield ? 'text-green-400 font-bold' : 'text-text-secondary'}>{result.statsA.midfield}</div>
                  <div className={result.statsA.defense > result.statsB.defense ? 'text-green-400 font-bold' : 'text-text-secondary'}>{result.statsA.defense}</div>
                </div>

                {/* Labels */}
                <div className="text-center space-y-4 pt-8">
                  <div className="text-xs uppercase font-bold text-text-secondary">Overall</div>
                  <div className="text-xs uppercase font-bold text-text-secondary">Attack</div>
                  <div className="text-xs uppercase font-bold text-text-secondary">Midfield</div>
                  <div className="text-xs uppercase font-bold text-text-secondary">Defense</div>
                </div>

                {/* Team B Stats */}
                <div className="text-left space-y-4">
                  <div className="font-bold text-lg truncate">{result.teamB.name}</div>
                  <div className="text-3xl font-black text-white">{result.statsB.overall}</div>
                  <div className={result.statsB.attack > result.statsA.attack ? 'text-green-400 font-bold' : 'text-text-secondary'}>{result.statsB.attack}</div>
                  <div className={result.statsB.midfield > result.statsA.midfield ? 'text-green-400 font-bold' : 'text-text-secondary'}>{result.statsB.midfield}</div>
                  <div className={result.statsB.defense > result.statsA.defense ? 'text-green-400 font-bold' : 'text-text-secondary'}>{result.statsB.defense}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompareTeams;