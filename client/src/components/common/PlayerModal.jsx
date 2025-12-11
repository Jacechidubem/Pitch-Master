import React from 'react';

const PlayerModal = ({ player, onClose }) => {
  if (!player) return null;

  const attr = player.attributes || {};
  
  // Helper to color-code stats
  const getStatColor = (val) => {
    if (val >= 90) return 'text-[#13ec6d] bg-[#13ec6d]'; // Neon Green
    if (val >= 80) return 'text-primary bg-primary';     // Green
    if (val >= 70) return 'text-yellow-500 bg-yellow-500'; // Yellow
    return 'text-white bg-white'; // White
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-[#1c2720] border border-primary/30 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        
        {/* Header Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent"></div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white material-symbols-outlined z-10">close</button>

        <div className="relative p-8 flex flex-col items-center">
          
          {/* Big Rating Badge */}
          <div className={`
            w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-4 bg-[#151f1a]
            ${player.rating >= 90 ? 'border-[#13ec6d] text-[#13ec6d]' : 'border-primary text-primary'}
          `}>
            <span className="text-4xl font-black leading-none">{player.rating}</span>
            <span className="text-[10px] font-bold uppercase text-white/60">OVR</span>
          </div>

          <h2 className="text-3xl font-black text-white text-center mb-1">{player.name}</h2>
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-8">
            <span className="font-bold bg-white/10 px-2 py-0.5 rounded">{player.position}</span>
            <span>{player.team}</span>
            <span>•</span>
            <span>{player.nationality}</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full">
            {[
              { label: 'Pace', val: attr.pace },
              { label: 'Shooting', val: attr.shooting },
              { label: 'Passing', val: attr.passing },
              { label: 'Dribbling', val: attr.dribbling },
              { label: 'Defending', val: attr.defending },
              { label: 'Physical', val: attr.physical },
              { label: 'Vision', val: attr.vision || 50 }, // Default if missing
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-xs font-bold text-text-secondary">
                  {stat.label.substring(0, 3).toUpperCase()}
                </div>
                <div className="flex-grow h-2 bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getStatColor(stat.val).split(' ')[1]}`} 
                    style={{ width: `${stat.val}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-bold w-6 text-right ${getStatColor(stat.val).split(' ')[0]}`}>
                  {stat.val}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlayerModal;