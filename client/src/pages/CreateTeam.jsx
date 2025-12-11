import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'; // Added useParams
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from '../components/layout/Navbar';
import SoccerField from '../components/team/SoccerField';
import DraggablePlayer from '../components/team/DraggablePlayer';
import playerService from '../services/playerService';
import teamService from '../services/teamService';
import { analyzeTeam } from '../utils/teamAnalysis';

const COACHES = [
  { name: "Sir Alex Ferguson", style: "Counter Attack", bonus: "Attacking +5" },
  { name: "Pep Guardiola", style: "Tiki Taka", bonus: "Passing +5" },
  { name: "Jurgen Klopp", style: "Gegenpress", bonus: "Physical +5" },
  { name: "Jose Mourinho", style: "Park the Bus", bonus: "Defending +5" },
  { name: "Carlo Ancelotti", style: "Fluid", bonus: "Chemistry +5" }
];

const CreateTeam = () => {
  const { id } = useParams(); // Check if we have an ID in the URL
  const isEditMode = !!id; // Boolean flag

  const [teamName, setTeamName] = useState("My Ultimate XI");
  const [formation, setFormation] = useState("4-3-3");
  const [selectedCoach, setSelectedCoach] = useState(COACHES[0].name);
  
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamState, setTeamState] = useState({});

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const analysis = useMemo(() => analyzeTeam(teamState), [teamState]);
  const usedPlayerIds = useMemo(() => new Set(Object.values(teamState).filter(p => p).map(p => p._id)), [teamState]);

  // --- 1. LOAD EXISTING TEAM (IF EDITING) ---
  useEffect(() => {
    const loadTeamToEdit = async () => {
      if (isEditMode && user) {
        try {
          const data = await teamService.getTeamById(id, user.token);
          setTeamName(data.name);
          setFormation(data.formation);
          setSelectedCoach(data.coach || COACHES[0].name);

          // Convert DB Array back to TeamState Object
          const loadedState = {};
          data.players.forEach(p => {
            if (p.player) loadedState[p.positionId] = p.player;
          });
          setTeamState(loadedState);

        } catch (error) {
          console.error("Failed to load team");
          navigate('/dashboard');
        }
      }
    };
    loadTeamToEdit();
  }, [id, isEditMode, user, navigate]);

  // --- 2. FETCH PLAYERS FOR SIDEBAR ---
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

  const handlePlayerDrop = (positionId, player) => {
    setTeamState((prev) => ({ ...prev, [positionId]: player }));
  };

  const handleSaveTeam = async () => {
    const formattedPlayers = Object.entries(teamState).map(([posId, player]) => ({
      positionId: posId,
      player: player._id,
    }));

    if (formattedPlayers.length === 0) {
      alert("Please place at least one player on the pitch!");
      return;
    }

    const teamData = {
      name: teamName,
      formation: formation,
      players: formattedPlayers,
      coach: selectedCoach
    };

    try {
      if (isEditMode) {
        // UPDATE Existing
        await teamService.updateTeam(id, teamData, user.token);
        alert("Team Updated Successfully! 🔄");
      } else {
        // CREATE New
        await teamService.createTeam(teamData, user.token);
        alert("Team Saved Successfully! 🏆");
      }
      navigate('/dashboard');
    } catch (error) {
      alert("Error saving team: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col min-h-screen bg-background-dark text-white font-display">
        <Navbar />

        <main className="flex-grow flex flex-col md:flex-row h-full overflow-hidden">
          {/* SIDEBAR */}
          <aside className="w-full md:w-[350px] bg-[#151f1a] border-r border-[#2a3b32] flex flex-col h-[calc(100vh-80px)] sticky top-20 shadow-xl z-20">
            <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar flex-grow">
              
              {/* Settings Block */}
              <div className="space-y-3 bg-[#1e2b24] p-4 rounded-lg border border-white/5 shadow-md">
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-2 border-b border-white/5 pb-2">
                  {isEditMode ? "Editing Strategy" : "Tactics Board"}
                </h3>
                
                <div>
                  <label className="text-[10px] uppercase text-text-secondary font-bold mb-1 block">Team Name</label>
                  <input 
                    type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-[10px] uppercase text-text-secondary font-bold mb-1 block">Formation</label>
                    <select 
                      value={formation} onChange={(e) => setFormation(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded p-2 text-xs text-white focus:border-primary focus:outline-none"
                    >
                      <option value="4-3-3">4-3-3</option>
                      <option value="4-4-2">4-4-2</option>
                      <option value="3-5-2">3-5-2</option>
                    </select>
                  </div>
                  <div className="flex-1">
                     <label className="text-[10px] uppercase text-text-secondary font-bold mb-1 block">Manager</label>
                     <select 
                      value={selectedCoach} onChange={(e) => setSelectedCoach(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded p-2 text-xs text-white focus:border-primary focus:outline-none"
                    >
                      {COACHES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Analysis Block (Keep same as before) */}
              <div className="p-4 bg-gradient-to-br from-[#1c2720] to-black rounded-lg border border-primary/20 shadow-lg relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all"></div>
                 <div className="flex justify-between items-end mb-3 relative z-10">
                   <h3 className="text-2xl font-black italic text-white leading-none">{analysis.overall} <span className="text-xs font-normal text-text-secondary not-italic">OVR</span></h3>
                   <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${analysis.overall > 85 ? 'bg-primary text-black' : 'bg-[#2a3b32] text-white border border-white/10'}`}>
                     {analysis.verdict}
                   </span>
                 </div>
                 <div className="grid grid-cols-3 gap-2 mb-3">
                   <div className="flex flex-col gap-1">
                     <span className="text-[9px] text-text-secondary font-bold text-center">ATT</span>
                     <div className="h-1 bg-white/10 rounded-full overflow-hidden w-full"><div className="h-full bg-green-500" style={{ width: `${analysis.attack}%` }}></div></div>
                     <span className="text-[10px] font-bold text-center">{analysis.attack}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                     <span className="text-[9px] text-text-secondary font-bold text-center">MID</span>
                     <div className="h-1 bg-white/10 rounded-full overflow-hidden w-full"><div className="h-full bg-yellow-500" style={{ width: `${analysis.midfield}%` }}></div></div>
                     <span className="text-[10px] font-bold text-center">{analysis.midfield}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                     <span className="text-[9px] text-text-secondary font-bold text-center">DEF</span>
                     <div className="h-1 bg-white/10 rounded-full overflow-hidden w-full"><div className="h-full bg-blue-500" style={{ width: `${analysis.defense}%` }}></div></div>
                     <span className="text-[10px] font-bold text-center">{analysis.defense}</span>
                   </div>
                 </div>
                 <p className="text-xs italic text-text-secondary border-t border-white/10 pt-2 relative z-10">"{analysis.comment}"</p>
              </div>

              {/* Player Search Block */}
              <div className="flex flex-col gap-3">
                 <div className="bg-black/40 border border-white/10 rounded-lg p-3 flex items-center gap-2 focus-within:border-primary/50 transition-colors">
                    <span className="material-symbols-outlined text-text-secondary">search</span>
                    <input 
                      type="text" placeholder="Search Legends..." 
                      value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent border-none text-sm w-full focus:outline-none text-white placeholder-white/30"
                    />
                 </div>
                 <div className="space-y-2 min-h-[200px]">
                    {loading ? (
                      <div className="flex items-center justify-center py-8"><span className="material-symbols-outlined animate-spin text-primary">progress_activity</span></div>
                    ) : players.length > 0 ? (
                      players.map((player) => (
                        <DraggablePlayer key={player._id} player={player} isSelected={usedPlayerIds.has(player._id)} />
                      ))
                    ) : (
                      <div className="text-center py-8 bg-[#1e2b24] rounded-lg border border-white/5"><p className="text-xs text-text-secondary">No players found</p></div>
                    )}
                 </div>
              </div>
            </div>

            {/* Save/Update Button */}
            <div className="p-4 border-t border-[#2a3b32] bg-[#151f1a]">
              <button 
                onClick={handleSaveTeam}
                className="w-full py-3 bg-primary text-[#102218] font-black rounded hover:bg-green-400 transition-all shadow-[0_0_15px_rgba(19,236,109,0.2)] hover:shadow-[0_0_20px_rgba(19,236,109,0.4)] uppercase tracking-wider text-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">save</span>
                {isEditMode ? "Update Squad" : "Save Squad"}
              </button>
            </div>
          </aside>

          {/* PITCH */}
          <section className="flex-grow bg-[#102218] relative flex items-center justify-center p-4 overflow-hidden h-[calc(100vh-80px)]">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3b5445 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             <div className="z-10 h-full w-full max-h-[800px] max-w-[550px] aspect-[2/3] py-4">
               <SoccerField 
                 formation={formation} 
                 teamState={teamState} 
                 onPlayerDrop={handlePlayerDrop} 
               />
             </div>
          </section>
        </main>
      </div>
    </DndProvider>
  );
};

export default CreateTeam;