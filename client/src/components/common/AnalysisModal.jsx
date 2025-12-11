import React from 'react';
import { analyzeTeam } from '../../utils/teamAnalysis';
import SingleRadar from './SingleRadar'; // Ensure this matches the file name exactly!

const AnalysisModal = ({ team, onClose }) => {
  if (!team) return null;

  const formatForAnalysis = (dbPlayers) => {
    const state = {};
    dbPlayers.forEach(p => {
      if (p.player) { 
        state[p.positionId] = {
          position: p.player.position,
          attributes: p.player.attributes
        };
      }
    });
    return state;
  };

  const stats = analyzeTeam(formatForAnalysis(team.players));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-[#1c2720] border border-primary/30 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-black/40 p-4 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">{team.name}</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-white material-symbols-outlined">close</button>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-4">
          
          {/* --- RADAR CHART SECTION --- */}
          <div className="flex justify-center -mt-2">
            {/* Explicit Height/Width container required for ChartJS */}
            <div style={{ width: '250px', height: '250px', position: 'relative' }}>
               <SingleRadar stats={stats} name={team.name} />
               
               {/* Center OVR Badge overlay */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4 pointer-events-none">
                 <div className="text-2xl font-black text-white drop-shadow-md bg-black/50 px-2 rounded">{stats.overall}</div>
               </div>
            </div>
          </div>
          {/* --------------------------- */}

          {/* Verdict */}
          <div>
            <h3 className="text-2xl font-black text-white italic mb-1">{stats.verdict}</h3>
            <p className="text-text-secondary text-sm px-4">"{stats.comment}"</p>
          </div>

          {/* Stat Bars */}
          <div className="space-y-2 bg-black/20 p-3 rounded-xl border border-white/5 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold w-8 text-left text-text-secondary">ATT</span>
              <div className="flex-grow h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${stats.attack}%` }}></div>
              </div>
              <span className="font-bold w-6 text-right">{stats.attack}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold w-8 text-left text-text-secondary">MID</span>
              <div className="flex-grow h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: `${stats.midfield}%` }}></div>
              </div>
              <span className="font-bold w-6 text-right">{stats.midfield}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold w-8 text-left text-text-secondary">DEF</span>
              <div className="flex-grow h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${stats.defense}%` }}></div>
              </div>
              <span className="font-bold w-6 text-right">{stats.defense}</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisModal;