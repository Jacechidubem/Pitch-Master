import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import playerService from '../services/playerService';
import teamService from '../services/teamService';
import { analyzeTeam } from '../utils/teamAnalysis';

import Navbar from '../components/layout/Navbar';
import SoccerField from '../components/team/SoccerField';

const COACHES = [
  { name: "Sir Alex Ferguson", style: "Counter Attack", bonus: "Attacking +5" },
  { name: "Pep Guardiola", style: "Tiki Taka", bonus: "Passing +5" },
  { name: "Jurgen Klopp", style: "Gegenpress", bonus: "Physical +5" },
  { name: "Jose Mourinho", style: "Park the Bus", bonus: "Defending +5" },
  { name: "Carlo Ancelotti", style: "Fluid", bonus: "Chemistry +5" }
];

const CreateTeam = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const [teamName, setTeamName] = useState("My Ultimate XI");
  const [formation, setFormation] = useState("4-3-3");
  const [selectedCoach, setSelectedCoach] = useState(COACHES[0].name);
  
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamState, setTeamState] = useState({});
  const [activeSlot, setActiveSlot] = useState(null); 

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const analysis = useMemo(() => analyzeTeam(teamState), [teamState]);
  const usedPlayerIds = useMemo(() => new Set(Object.values(teamState).filter(p => p).map(p => p._id)), [teamState]);

  // --- LOAD TEAM ---
  useEffect(() => {
    const loadTeamToEdit = async () => {
      if (isEditMode && user) {
        try {
          const data = await teamService.getTeamById(id, user.token);
          setTeamName(data.name);
          setFormation(data.formation);
          setSelectedCoach(data.coach || COACHES[0].name);
          const loadedState = {};
          data.players.forEach(p => {
            if (p.player) loadedState[p.positionId] = p.player;
          });
          setTeamState(loadedState);
        } catch (error) {
          toast.error("Failed to load team");
          navigate('/dashboard');
        }
      }
    };
    loadTeamToEdit();
  }, [id, isEditMode, user, navigate]);

  // --- FETCH PLAYERS ---
  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const data = await playerService.getPlayers(searchTerm);
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
      setLoading(false);
    };
    const delayDebounce = setTimeout(() => fetchPlayers(), 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // --- HANDLERS ---
  const handleSlotClick = (positionId) => setActiveSlot(positionId);

  const handlePlayerSelect = (player) => {
    if (!activeSlot) return toast.warn("Please select a position on the pitch first! 📍");
    if (usedPlayerIds.has(player._id)) return toast.error(`${player.name} is already in your squad!`);

    setTeamState(prev => ({ ...prev, [activeSlot]: player }));
    toast.success(`Added ${player.name} to ${activeSlot.toUpperCase()}`);
    setActiveSlot(null);
  };

  const handleRemovePlayer = (positionId, e) => {
    e.stopPropagation();
    setTeamState(prev => {
      const newState = { ...prev };
      delete newState[positionId];
      return newState;
    });
    toast.info("Player removed");
  };

  const handleSaveTeam = async () => {
    if (user && !user.isVerified) return toast.error("Please verify your email before saving squads! 📧");
    
    const formattedPlayers = Object.entries(teamState).map(([posId, player]) => ({
      positionId: posId,
      player: player._id,
    }));

    if (formattedPlayers.length === 0) return toast.warn("Please place at least one player on the pitch!");

    const teamData = { name: teamName, formation, players: formattedPlayers, coach: selectedCoach };

    try {
      if (isEditMode) {
        await teamService.updateTeam(id, teamData, user.token);
        toast.success("Team Updated Successfully! 🔄");
      } else {
        await teamService.createTeam(teamData, user.token);
        toast.success("Team Saved Successfully! 🏆");
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving team");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0d1110] text-white font-sans">
      <Navbar />

      <main className="flex-grow flex flex-col md:flex-row h-full overflow-hidden">
        
        {/* --- SIDEBAR --- */}
        <aside className="w-full md:w-[350px] bg-[#121614] border-r border-[#2a3b32] flex flex-col h-[calc(100vh-80px)] sticky top-20 shadow-xl z-20">
          
          <div className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-4">
            
            {/* 1. STRATEGY BLOCK (Restored) */}
            <div className="space-y-3 bg-[#1e2622] p-4 rounded-lg border border-white/5 shadow-md">
              <h3 className="text-[10px] font-bold text-[#13ec6d] uppercase tracking-widest mb-2 border-b border-white/5 pb-2">
                {isEditMode ? "Editing Strategy" : "Tactics Board"}
              </h3>
              
              <div>
                <label className="text-[9px] uppercase text-gray-400 font-bold mb-1 block">Team Name</label>
                <input 
                  type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-[#121614] border border-white/10 rounded p-2 text-sm text-white focus:border-[#13ec6d] focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-[9px] uppercase text-gray-400 font-bold mb-1 block">Formation</label>
                  <select 
                    value={formation} onChange={(e) => { setFormation(e.target.value); setTeamState({}); }}
                    className="w-full bg-[#121614] border border-white/10 rounded p-2 text-xs text-white focus:border-[#13ec6d] focus:outline-none"
                  >
                    <option value="4-3-3">4-3-3</option>
                    <option value="4-4-2">4-4-2</option>
                    <option value="3-5-2">3-5-2</option>
                  </select>
                </div>
                <div className="flex-1">
                   <label className="text-[9px] uppercase text-gray-400 font-bold mb-1 block">Manager</label>
                   <select 
                    value={selectedCoach} onChange={(e) => setSelectedCoach(e.target.value)}
                    className="w-full bg-[#121614] border border-white/10 rounded p-2 text-xs text-white focus:border-[#13ec6d] focus:outline-none"
                  >
                    {COACHES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. ANALYSIS BLOCK (Restored) */}
            <div className="p-4 bg-gradient-to-br from-[#1c2720] to-[#0d1110] rounded-lg border border-[#13ec6d]/20 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#13ec6d]/10 rounded-full blur-xl group-hover:bg-[#13ec6d]/20 transition-all"></div>
                <div className="flex justify-between items-end mb-3 relative z-10">
                  <h3 className="text-3xl font-black italic text-white leading-none tracking-tighter">
                    {analysis.overall} <span className="text-xs font-normal text-gray-400 not-italic tracking-normal">OVR</span>
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${analysis.overall > 85 ? 'bg-[#13ec6d] text-black' : 'bg-[#2a3b32] text-white border border-white/10'}`}>
                    {analysis.verdict}
                  </span>
                </div>

                {/* Stat Bars */}
                <div className="grid grid-cols-3 gap-2 mb-3 relative z-10">
                   <div className="flex flex-col gap-1">
                      <span className="text-[8px] text-gray-400 font-bold text-center">ATT</span>
                      <div className="h-1 bg-white/10 rounded-full w-full overflow-hidden"><div className="h-full bg-green-500" style={{ width: `${analysis.attack}%` }}></div></div>
                      <span className="text-[9px] font-bold text-center">{analysis.attack}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[8px] text-gray-400 font-bold text-center">MID</span>
                      <div className="h-1 bg-white/10 rounded-full w-full overflow-hidden"><div className="h-full bg-yellow-500" style={{ width: `${analysis.midfield}%` }}></div></div>
                      <span className="text-[9px] font-bold text-center">{analysis.midfield}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[8px] text-gray-400 font-bold text-center">DEF</span>
                      <div className="h-1 bg-white/10 rounded-full w-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${analysis.defense}%` }}></div></div>
                      <span className="text-[9px] font-bold text-center">{analysis.defense}</span>
                   </div>
                </div>

                <p className="text-[10px] italic text-gray-400 border-t border-white/5 pt-2 relative z-10">"{analysis.comment}"</p>
            </div>

            {/* 3. PLAYER SEARCH */}
            <div className="sticky top-0 bg-[#121614] z-10 pb-2 border-b border-[#2a3b32]">
               <div className={`text-xs font-bold text-center uppercase tracking-widest py-2 mb-2 rounded border ${activeSlot ? 'border-[#13ec6d] text-[#13ec6d] bg-[#13ec6d]/10 animate-pulse' : 'border-transparent text-gray-500'}`}>
                  {activeSlot ? `Selecting for: ${activeSlot.toUpperCase()}` : "Select a position on pitch"}
               </div>

               <div className="bg-[#1e2622] rounded-lg p-3 flex items-center gap-2 border border-white/5 focus-within:border-[#13ec6d] transition-colors">
                  <span className="material-symbols-outlined text-gray-400">search</span>
                  <input 
                    type="text" placeholder="Search Legends..." 
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent border-none text-sm w-full focus:outline-none text-white placeholder-gray-500 font-medium"
                  />
               </div>
            </div>

            {/* 4. PLAYER LIST */}
            <div className="space-y-2 min-h-[200px]">
              {loading ? (
                 <div className="flex items-center justify-center py-8"><span className="material-symbols-outlined animate-spin text-[#13ec6d]">progress_activity</span></div>
              ) : players.length > 0 ? (
                players.map((player) => {
                  const isUsed = usedPlayerIds.has(player._id);
                  const rating = player.rating || 90; 

                  return (
                    <div 
                      key={player._id} 
                      onClick={() => !isUsed && handlePlayerSelect(player)}
                      className={`relative flex items-center gap-3 p-3 rounded-md border transition-all duration-200 group
                        ${isUsed 
                          ? 'bg-[#1a221e] border-[#2a3b32] opacity-50 cursor-default' 
                          : 'bg-[#1e2622] border-[#2a3b32] hover:border-[#13ec6d] cursor-pointer hover:bg-[#252f2a]'
                        }
                        ${activeSlot && !isUsed ? 'ring-1 ring-[#13ec6d]/30' : ''}
                      `}
                    >
                       {/* Rating */}
                       <div className={`
                         w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 shadow-inner
                         ${isUsed ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-[#0f3a25] border-[#13ec6d] text-[#13ec6d]'}
                       `}>
                         {rating}
                       </div>

                       {/* Info */}
                       <div className="flex-grow">
                         <h4 className={`text-sm font-bold leading-tight ${isUsed ? 'text-gray-500' : 'text-white'}`}>
                           {player.name}
                         </h4>
                         <div className="text-[10px] font-bold uppercase text-gray-500 mt-0.5">
                           {player.position} <span className="text-gray-600 mx-1">•</span> Icons
                         </div>
                       </div>

                       {/* Selection Icon */}
                       {!isUsed && activeSlot && (
                         <span className="material-symbols-outlined text-[#13ec6d] opacity-0 group-hover:opacity-100 transition-opacity">add_circle</span>
                       )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 opacity-50"><p className="text-xs text-gray-400">No players found</p></div>
              )}
            </div>
          </div>

          {/* 5. SAVE BUTTON */}
          <div className="p-4 bg-[#121614] border-t border-[#2a3b32]">
            <button 
              onClick={handleSaveTeam}
              className="w-full py-3 bg-[#13ec6d] hover:bg-[#10d460] text-[#0d1110] font-black uppercase tracking-wider rounded text-sm transition-transform active:scale-95 shadow-[0_0_20px_rgba(19,236,109,0.2)] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">save</span>
              {isEditMode ? "Update Squad" : "Save Squad"}
            </button>
          </div>
        </aside>

        {/* --- PITCH SECTION --- */}
        <section className="flex-grow bg-[#0d1110] relative flex items-center justify-center p-6 overflow-hidden">
           <SoccerField 
             formation={formation} 
             teamState={teamState} 
             activeSlot={activeSlot}
             onSlotClick={handleSlotClick}
             onRemove={handleRemovePlayer}
           />
        </section>
      </main>
    </div>
  );
};

export default CreateTeam;