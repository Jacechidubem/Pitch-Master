import React from 'react';
import { useDrag } from 'react-dnd';

const DraggablePlayer = ({ player, isSelected }) => {
  // Only allow dragging if NOT selected
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PLAYER',
    item: { player },
    canDrag: !isSelected, // Disable drag if selected
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  if (isSelected) {
    return (
      <div className="flex items-center gap-3 p-3 rounded bg-black/20 border border-white/5 opacity-50 cursor-not-allowed grayscale">
        <div className="w-10 h-10 bg-[#102218] rounded-full border border-white/10 flex items-center justify-center text-white/30 font-bold text-xs">
          ✓
        </div>
        <div>
          <p className="text-sm font-bold text-white/50">{player.name}</p>
          <p className="text-[10px] text-white/30">
            Selected
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={drag}
      className={`flex items-center gap-3 p-3 rounded bg-[#2a3b32] border border-white/10 hover:border-primary/50 cursor-grab active:cursor-grabbing transition-all hover:bg-[#34463d] shadow-sm ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="w-10 h-10 bg-[#102218] rounded-full border border-primary/30 flex items-center justify-center text-primary font-bold shadow-inner">
        {player.rating}
      </div>
      <div>
        <p className="text-sm font-bold text-white">{player.name}</p>
        <p className="text-[10px] text-text-secondary uppercase tracking-wider">
          {player.position} • {player.team}
        </p>
      </div>
    </div>
  );
};

export default DraggablePlayer;