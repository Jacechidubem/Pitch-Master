import React from 'react';
import PlayerSlot from './PlayerSlot';

const SoccerField = ({ formation = "4-3-3", teamState = {}, onPlayerDrop }) => {

  const getPositions = (form) => {
    switch (form) {
      case "4-4-2":
        return [
          { id: 'gk', top: '90%', left: '50%', role: 'GK' }, // Moved up slightly
          { id: 'lb', top: '75%', left: '15%', role: 'LB' },
          { id: 'lcb', top: '75%', left: '35%', role: 'CB' },
          { id: 'rcb', top: '75%', left: '65%', role: 'CB' },
          { id: 'rb', top: '75%', left: '85%', role: 'RB' },
          { id: 'lm', top: '50%', left: '15%', role: 'LM' },
          { id: 'lcm', top: '50%', left: '38%', role: 'CM' },
          { id: 'rcm', top: '50%', left: '62%', role: 'CM' },
          { id: 'rm', top: '50%', left: '85%', role: 'RM' },
          { id: 'lst', top: '20%', left: '35%', role: 'ST' }, // Moved down
          { id: 'rst', top: '20%', left: '65%', role: 'ST' },
        ];
      case "3-5-2":
        return [
          { id: 'gk', top: '90%', left: '50%', role: 'GK' },
          { id: 'lcb', top: '78%', left: '25%', role: 'CB' },
          { id: 'cb', top: '82%', left: '50%', role: 'CB' },
          { id: 'rcb', top: '78%', left: '75%', role: 'CB' },
          { id: 'cdm1', top: '60%', left: '40%', role: 'CDM' },
          { id: 'cdm2', top: '60%', left: '60%', role: 'CDM' },
          { id: 'lm', top: '45%', left: '10%', role: 'LM' },
          { id: 'cam', top: '35%', left: '50%', role: 'CAM' },
          { id: 'rm', top: '45%', left: '90%', role: 'RM' },
          { id: 'lst', top: '18%', left: '35%', role: 'ST' },
          { id: 'rst', top: '18%', left: '65%', role: 'ST' },
        ];
      case "4-3-3":
      default:
        return [
          { id: 'gk', top: '90%', left: '50%', role: 'GK' },
          { id: 'lb', top: '72%', left: '15%', role: 'LB' },
          { id: 'lcb', top: '78%', left: '35%', role: 'CB' },
          { id: 'rcb', top: '78%', left: '65%', role: 'CB' },
          { id: 'rb', top: '72%', left: '85%', role: 'RB' },
          { id: 'lcm', top: '50%', left: '30%', role: 'CM' },
          { id: 'rcm', top: '50%', left: '70%', role: 'CM' },
          { id: 'cam', top: '40%', left: '50%', role: 'CAM' },
          { id: 'lw', top: '25%', left: '20%', role: 'LW' },
          { id: 'st', top: '18%', left: '50%', role: 'ST' },
          { id: 'rw', top: '25%', left: '80%', role: 'RW' },
        ];
    }
  };

  const positions = getPositions(formation);

  return (
    // Added 'py-4' padding inside the container so players on edges aren't cut off
    <div className="relative w-full h-full bg-[#1c2720] border-2 border-white/20 rounded-lg shadow-2xl transition-all duration-500 box-border">
       {/* Static Markings */}
       <div className="absolute top-1/2 w-full h-px bg-white/20"></div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full"></div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/40 rounded-full"></div>
       
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-1/6 border-b border-x border-white/20"></div>
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-1/6 border-t border-x border-white/20"></div>
       
       {/* Dynamic Players */}
       {positions.map((pos) => (
        <PlayerSlot 
          key={pos.id}
          position={pos}
          assignedPlayer={teamState[pos.id]} 
          onDrop={(player) => onPlayerDrop(pos.id, player)} 
        />
      ))}
    </div>
  );
};

export default SoccerField;