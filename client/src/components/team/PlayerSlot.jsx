import React from 'react';
import { useDrop } from 'react-dnd';

const PlayerSlot = ({ position, assignedPlayer, onDrop }) => {
  // Setup drop hook
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PLAYER', // Must match the type in DraggablePlayer
    drop: (item) => onDrop(item.player), // Function to run when dropped
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 cursor-pointer group transition-all"
      style={{ top: position.top, left: position.left }}
    >
      {/* The Circle */}
      <div
        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOver 
            ? 'bg-primary border-white scale-125' // Highlight when hovering
            : assignedPlayer 
              ? 'bg-background-dark border-primary' 
              : 'bg-background-dark/50 border-white/30'
        }`}
      >
        {assignedPlayer ? (
          <span className="text-xs font-bold text-primary">{assignedPlayer.rating}</span>
        ) : (
          <span className="text-xs font-bold text-white/50">{position.role}</span>
        )}
      </div>

      {/* The Name Tag */}
      <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${
        assignedPlayer ? 'bg-primary text-black' : 'bg-black/60 text-white/70'
      }`}>
        {assignedPlayer ? (
          <span className="truncate max-w-[80px] block">{assignedPlayer.name.split(' ').pop()}</span>
        ) : (
          "Empty"
        )}
      </div>
    </div>
  );
};

export default PlayerSlot;