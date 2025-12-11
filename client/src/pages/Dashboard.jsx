import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnalysisModal from '../components/common/AnalysisModal'; // Import Modal
import teamService from '../services/teamService';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // --- MODAL STATE ---
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await teamService.getMyTeams(user.token);
        setTeams(data);
      } catch (error) {
        console.error("Error loading teams:", error);
      }
      setIsLoading(false);
    };

    if (user) {
      fetchTeams();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this squad?")) {
      try {
        await teamService.deleteTeam(id, user.token);
        setTeams(teams.filter((team) => team._id !== id));
      } catch (error) {
        alert("Could not delete team");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark font-display text-white">
      <Navbar />
      
      {/* --- RENDER MODAL IF TEAM SELECTED --- */}
      {selectedTeam && (
        <AnalysisModal 
          team={selectedTeam} 
          onClose={() => setSelectedTeam(null)} 
        />
      )}

      <main className="flex-grow px-4 sm:px-6 md:px-8 lg:px-10 xl:px-40 py-10">
        <div className="mx-auto max-w-[960px]">
          
          <div className="flex justify-between items-end mb-8 border-b border-border-light pb-4">
            <div>
              <h1 className="text-3xl font-bold">My Squads</h1>
              <p className="text-text-secondary text-sm mt-1">Manage your saved lineups</p>
            </div>
            <Link to="/create-team">
              <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-400 transition-colors">
                <span className="material-symbols-outlined text-lg">add</span>
                New Squad
              </button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
               <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
          ) : teams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div key={team._id} className="bg-surface-dark border border-border-light rounded-xl p-5 hover:border-primary/50 transition-all group shadow-lg relative overflow-hidden flex flex-col">
                  
                  {/* Card Header */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold truncate pr-2">{team.name}</h2>
                      <span className="px-2 py-1 bg-black/40 rounded text-[10px] font-bold uppercase text-text-secondary border border-white/5">
                        {team.formation}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className="material-symbols-outlined text-base">person</span>
                        {/* Coach Name Fix */}
                        <span>Manager: <span className="text-white font-medium">{team.coach || "Unknown"}</span></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className="material-symbols-outlined text-base">groups</span>
                        <span>Players: <span className="text-white font-medium">{team.players.length}</span></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                         <span className="material-symbols-outlined text-base">calendar_today</span>
                         <span>{new Date(team.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <button 
                        onClick={() => handleDelete(team._id)}
                        className="flex-1 py-2 rounded-lg border border-red-500/30 text-red-500 text-xs font-bold hover:bg-red-500/10 transition-colors"
                      >
                        Delete
                      </button>
                      <Link 
                       to={`/edit-team/${team._id}`}
                       className="flex-1 py-2 rounded-lg bg-[#2a3b32] text-white text-xs font-bold hover:bg-[#34463d] transition-colors border border-white/5 text-center flex items-center justify-center"
                         >
                       Edit
                       </Link>
                      <button 
                        onClick={() => setSelectedTeam(team)} // Open Modal
                        className="flex-[2] py-2 rounded-lg bg-[#2a3b32] text-white text-xs font-bold hover:bg-[#34463d] transition-colors border border-white/5"
                      >
                        View Analysis
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface-dark rounded-xl border border-dashed border-border-light">
              <span className="material-symbols-outlined text-4xl text-text-secondary mb-3">sports_soccer</span>
              <h3 className="text-xl font-bold text-white">No Squads Yet</h3>
              <Link to="/create-team" className="mt-4 inline-block">
                <button className="bg-primary text-black px-6 py-2 rounded-lg font-bold hover:bg-green-400 transition-colors">
                  Build Squad
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;