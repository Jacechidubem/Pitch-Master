import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../redux/slices/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    setIsOpen(false); // Close menu on logout
    navigate('/');
  };

  // Helper to close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-40 py-5 sticky top-0 z-50 bg-background-dark/90 backdrop-blur-sm border-b border-border-dark">
      <div className="mx-auto max-w-[960px]">
        <header className="flex items-center justify-between whitespace-nowrap px-4 md:px-10 py-3 relative">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-4 group" onClick={closeMenu}>
            <div className="size-6 text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">sports_soccer</span>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Pitch Master</h2>
          </Link>
          
          {/* Mobile Menu Button (Hamburger) */}
          <button 
            className="md:hidden text-white hover:text-primary transition-colors z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-6">
              {user && (
                <Link to="/dashboard" className="text-white text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-lg">dashboard</span>
                  My Squads
                </Link>
              )}
              {user && (
                <Link to="/create-team" className="text-white text-sm font-medium hover:text-primary transition-colors">Build XI</Link>
              )}
              <Link to="/compare" className="text-white text-sm font-medium hover:text-primary transition-colors">Compare</Link>
              <Link to="/players" className="text-white text-sm font-medium hover:text-primary transition-colors">Players</Link>
            </div>
            
            <div className="flex gap-2 ml-4 border-l border-white/10 pl-6">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-primary font-bold hidden lg:block">Hi, {user.name.split(' ')[0]}</span>
                  <button onClick={onLogout} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-red-600/20 text-red-500 border border-red-600/50 text-sm font-bold hover:bg-red-600 hover:text-white transition-all">Logout</button>
                </div>
              ) : (
                <>
                  <Link to="/register"><button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-[#111814] text-sm font-bold hover:bg-green-400 hover:scale-105 transition-all">Sign Up</button></Link>
                  <Link to="/login"><button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-surface-dark text-white text-sm font-bold hover:bg-border-light transition-colors border border-border-light">Login</button></Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation Dropdown (Visible only when open) */}
          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-[#1c2720] border-b border-border-dark md:hidden flex flex-col p-4 shadow-2xl animate-fade-in z-40">
               {user && (
                <Link to="/dashboard" onClick={closeMenu} className="py-3 border-b border-white/10 text-white hover:text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined">dashboard</span> My Squads
                </Link>
               )}
               {user && (
                <Link to="/create-team" onClick={closeMenu} className="py-3 border-b border-white/10 text-white hover:text-primary">Build XI</Link>
               )}
               <Link to="/compare" onClick={closeMenu} className="py-3 border-b border-white/10 text-white hover:text-primary">Compare Teams</Link>
               <Link to="/players" onClick={closeMenu} className="py-3 border-b border-white/10 text-white hover:text-primary">Player Database</Link>
               
               <div className="mt-4 flex gap-4">
                 {user ? (
                   <button onClick={onLogout} className="w-full py-3 bg-red-600/20 text-red-500 border border-red-600/50 rounded font-bold">Logout</button>
                 ) : (
                   <>
                     <Link to="/register" onClick={closeMenu} className="flex-1"><button className="w-full py-3 bg-primary text-black rounded font-bold">Sign Up</button></Link>
                     <Link to="/login" onClick={closeMenu} className="flex-1"><button className="w-full py-3 bg-black/40 text-white border border-white/20 rounded font-bold">Login</button></Link>
                   </>
                 )}
               </div>
            </div>
          )}

        </header>
      </div>
    </div>
  );
};

export default Navbar;