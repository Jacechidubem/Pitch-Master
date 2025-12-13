import React from 'react';

const SoccerField = ({ formation = "4-3-3", teamState = {}, activeSlot, onSlotClick, onRemove }) => {

  const getPositions = (form) => {
    // ... (Keep your existing switch/case logic for positions exactly as it was) ...
    // using the default 4-3-3 for brevity in this snippet, but keep your full list!
     switch (form) {
      case "4-4-2": return [ { id: 'gk', top: '90%', left: '50%', role: 'GK' }, { id: 'lb', top: '75%', left: '15%', role: 'LB' }, { id: 'lcb', top: '75%', left: '35%', role: 'CB' }, { id: 'rcb', top: '75%', left: '65%', role: 'CB' }, { id: 'rb', top: '75%', left: '85%', role: 'RB' }, { id: 'lm', top: '50%', left: '15%', role: 'LM' }, { id: 'lcm', top: '50%', left: '38%', role: 'CM' }, { id: 'rcm', top: '50%', left: '62%', role: 'CM' }, { id: 'rm', top: '50%', left: '85%', role: 'RM' }, { id: 'lst', top: '20%', left: '35%', role: 'ST' }, { id: 'rst', top: '20%', left: '65%', role: 'ST' } ];
      case "3-5-2": return [ { id: 'gk', top: '90%', left: '50%', role: 'GK' }, { id: 'lcb', top: '78%', left: '25%', role: 'CB' }, { id: 'cb', top: '82%', left: '50%', role: 'CB' }, { id: 'rcb', top: '78%', left: '75%', role: 'CB' }, { id: 'cdm1', top: '60%', left: '40%', role: 'CDM' }, { id: 'cdm2', top: '60%', left: '60%', role: 'CDM' }, { id: 'lm', top: '45%', left: '10%', role: 'LM' }, { id: 'cam', top: '35%', left: '50%', role: 'CAM' }, { id: 'rm', top: '45%', left: '90%', role: 'RM' }, { id: 'lst', top: '18%', left: '35%', role: 'ST' }, { id: 'rst', top: '18%', left: '65%', role: 'ST' } ];
      default: return [ { id: 'gk', top: '90%', left: '50%', role: 'GK' }, { id: 'lb', top: '72%', left: '15%', role: 'LB' }, { id: 'lcb', top: '78%', left: '35%', role: 'CB' }, { id: 'rcb', top: '78%', left: '65%', role: 'CB' }, { id: 'rb', top: '72%', left: '85%', role: 'RB' }, { id: 'lcm', top: '50%', left: '30%', role: 'CM' }, { id: 'rcm', top: '50%', left: '70%', role: 'CM' }, { id: 'cam', top: '40%', left: '50%', role: 'CAM' }, { id: 'lw', top: '25%', left: '20%', role: 'LW' }, { id: 'st', top: '18%', left: '50%', role: 'ST' }, { id: 'rw', top: '25%', left: '80%', role: 'RW' } ];
    }
  };

  const positions = getPositions(formation);

  return (
    <div className="relative w-full h-full max-w-[800px] aspect-[1.4] bg-[#121614] border border-white/10 rounded-xl shadow-2xl overflow-hidden select-none">
      
      {/* --- PITCH LINES (Clean Vector Style) --- */}
      <div className="absolute inset-4 border border-white/20 rounded-lg pointer-events-none"></div>
      <div className="absolute top-1/2 left-4 right-4 h-px bg-white/20 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white/40 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      {/* Penalty Boxes */}
      <div className="absolute top-4 left-1/2 w-48 h-20 border-b border-x border-white/20 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-4 left-1/2 w-48 h-20 border-t border-x border-white/20 -translate-x-1/2 pointer-events-none"></div>

      {/* --- PLAYERS --- */}
      {positions.map((pos) => {
        const player = teamState[pos.id];
        const isActive = activeSlot === pos.id;
        const rating = player?.rating || 88; // Default rating if missing

        return (
          <div
            key={pos.id}
            onClick={() => onSlotClick(pos.id)}
            style={{ top: pos.top, left: pos.left }}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
              ${isActive ? 'scale-110 z-30' : 'hover:scale-105 z-10'}
            `}
          >
            {player ? (
              // --- FILLED STATE (Matches your Screenshot) ---
              <>
                {/* 1. Rating Circle */}
                <div className={`
                  w-12 h-12 rounded-full border-2 bg-[#0d1110] flex items-center justify-center shadow-lg relative
                  ${isActive ? 'border-white text-white' : 'border-[#13ec6d] text-[#13ec6d]'}
                `}>
                   <span className="text-sm font-black tracking-tighter">{rating}</span>
                   
                   {/* Remove Button (Hidden by default, shows on hover) */}
                   <button 
                     onClick={(e) => onRemove(pos.id, e)}
                     className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 hover:opacity-100 transition-opacity"
                   >✕</button>
                </div>

                {/* 2. Name Pill */}
                <div className={`
                  mt-1 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md whitespace-nowrap
                  ${isActive ? 'bg-white text-black' : 'bg-[#13ec6d] text-[#0d1110]'}
                `}>
                  {player.name.split(' ').pop()} {/* Shows Last Name Only */}
                </div>
              </>
            ) : (
              // --- EMPTY STATE ---
              <>
                <div className={`
                  w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center transition-colors
                  ${isActive ? 'border-[#13ec6d] bg-[#13ec6d]/10' : 'border-white/20 bg-white/5'}
                `}>
                  <span className={`text-[10px] font-bold ${isActive ? 'text-[#13ec6d]' : 'text-white/40'}`}>
                    {pos.role}
                  </span>
                </div>
                {/* "Select" Text only if active */}
                {isActive && (
                  <div className="mt-1 text-[8px] text-[#13ec6d] uppercase font-bold tracking-widest animate-pulse">
                    Select
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SoccerField;