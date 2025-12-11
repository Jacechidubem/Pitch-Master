import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Developer = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-dark font-display text-white">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-3xl w-full bg-surface-dark border border-border-light rounded-2xl shadow-2xl overflow-hidden relative group">
          
          {/* Decorative Top Line */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-blue-500"></div>

          <div className="p-10 text-center">
            
            {/* Avatar / Initials */}
            <div className="w-24 h-24 mx-auto bg-black/40 rounded-full flex items-center justify-center text-3xl font-black text-primary border-2 border-primary/30 mb-6 shadow-[0_0_20px_rgba(19,236,109,0.2)]">
              EJ
            </div>

            <h1 className="text-4xl font-bold mb-2">Enyinnia Joseph C.</h1>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-6">Full Stack Developer</p>

            <p className="text-gray-300 leading-relaxed text-lg mb-8 max-w-xl mx-auto">
              Hi, I'm the creator of <span className="text-white font-bold">Pitch Master</span>. 
              I built this project to demonstrate the power of the <span className="text-white font-bold">MERN Stack</span> combined with advanced state management and interactive UI design.
            </p>

            {/* Tech Stack Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              <div className="p-3 bg-black/20 rounded border border-white/5 text-sm font-bold text-text-secondary hover:text-white hover:border-primary/50 transition-colors">MongoDB</div>
              <div className="p-3 bg-black/20 rounded border border-white/5 text-sm font-bold text-text-secondary hover:text-white hover:border-primary/50 transition-colors">Express.js</div>
              <div className="p-3 bg-black/20 rounded border border-white/5 text-sm font-bold text-text-secondary hover:text-white hover:border-primary/50 transition-colors">React + Redux</div>
              <div className="p-3 bg-black/20 rounded border border-white/5 text-sm font-bold text-text-secondary hover:text-white hover:border-primary/50 transition-colors">Node.js</div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://github.com/Jacechidubem" // <--- PASTE YOUR LINK HERE
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all hover:scale-105"
              >
                {/* Simple Code Icon */}
                <span className="material-symbols-outlined">code</span> 
                <span className="font-bold">GitHub Profile</span>
              </a>
              
              <a 
                href="mailto:josephchidubem2005@gmail.com" // <--- OPTIONAL: Add your email
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-black rounded-lg font-bold hover:bg-green-400 transition-all hover:scale-105 shadow-lg"
              >
                <span className="material-symbols-outlined">mail</span>
                Contact Me
              </a>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Developer;