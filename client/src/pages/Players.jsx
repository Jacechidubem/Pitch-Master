import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PlayerModal from '../components/common/PlayerModal'; // <--- Import Modal
import playerService from '../services/playerService';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- NEW STATE ---
  const [selectedPlayer, setSelectedPlayer] = useState(null); 

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const data = await playerService.getPlayers(searchTerm);
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players");
      }
      setLoading(false);
    };

    const timeout = setTimeout(() => {
      fetchPlayers();
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="flex flex-col min-h-screen bg-background-dark font-display text-white">
      <Navbar />

      {/* --- SHOW MODAL IF PLAYER SELECTED --- */}
      {selectedPlayer && (
        <PlayerModal 
          player={selectedPlayer} 
          onClose={() => setSelectedPlayer(null)} 
        />
      )}

      <main className="flex-grow px-4 py-10">
        <div className="mx-auto max-w-6xl">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Player Database</h1>
              <p className="text-text-secondary text-sm">Scout the world's best talent</p>
            </div>
            
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
              <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface-dark border border-border-light rounded-full py-2 pl-10 pr-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
               <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {players.map((player) => (
                <div 
                  key={player._id} 
                  onClick={() => setSelectedPlayer(player)} // <--- CLICK HANDLER
                  className="bg-surface-dark border border-border-light rounded-xl p-4 hover:border-primary/50 transition-all flex items-center gap-4 group cursor-pointer hover:shadow-lg hover:bg-white/5"
                >
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-lg font-black border-2 shadow-lg
                    ${player.rating >= 90 ? 'bg-[#13ec6d]/20 border-[#13ec6d] text-[#13ec6d]' : 
                      player.rating >= 85 ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : 
                      'bg-white/10 border-white/20 text-white'}
                  `}>
                    {player.rating}
                  </div>

                  <div>
                    <h3 className="font-bold text-white group-hover:text-primary transition-colors">{player.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
                      <span className="uppercase font-bold tracking-wider bg-black/40 px-1.5 py-0.5 rounded">{player.position}</span>
                      <span>{player.team}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Players;