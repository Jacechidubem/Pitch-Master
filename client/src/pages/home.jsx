import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark font-display text-white">
      
      {/* 1. Navigation Bar */}
      <Navbar />

      <main className="flex flex-col grow">
        
        {/* 2. Hero Section (The Stadium Background) */}
        <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-40 py-5">
          <div className="mx-auto max-w-[960px]">
            <div className="p-4">
              <div 
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 text-center border border-border-light shadow-2xl"
                style={{
                  // Stadium night shot with a dark overlay
                  backgroundImage: 'linear-gradient(rgba(16, 34, 24, 0.7) 0%, rgba(16, 34, 24, 0.95) 100%), url("https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop")'
                }}
              >
                <div className="flex flex-col gap-2 max-w-4xl">
                  <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                    Craft, Compare, Conquer:<br/>Your Ultimate Football XI
                  </h1>
                  <h2 className="text-white/80 text-sm md:text-base font-normal max-w-2xl mx-auto mt-4">
                    Build your dream team, analyze strengths, and dive deep into player profiles with Pitch Master.
                  </h2>
                </div>
                
                {/* Primary Action Button */}
                <Link to="/create-team" className="mt-4">
                  <button className="flex items-center justify-center rounded-lg h-12 px-8 bg-primary text-[#111814] text-base font-bold hover:bg-green-400 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(19,236,109,0.4)]">
                    Start Building Your XI
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Features Section (Grid) */}
        <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-40 py-10">
          <div className="mx-auto max-w-[960px] px-4">
            <div className="flex flex-col gap-4 text-center mb-10">
              <h1 className="text-[32px] md:text-4xl font-bold leading-tight mx-auto max-w-[720px]">
                The Ultimate Toolkit
              </h1>
              <p className="text-text-secondary">Everything you need to master the pitch.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature Card 1 */}
              <div className="flex flex-col gap-4 rounded-xl border border-border-light bg-surface-dark p-6 hover:border-primary transition-colors duration-300 group">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">style</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-bold">Custom XIs</h2>
                  <p className="text-text-secondary text-sm">Drag and drop players to create your perfect tactical setup.</p>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="flex flex-col gap-4 rounded-xl border border-border-light bg-surface-dark p-6 hover:border-primary transition-colors duration-300 group">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">analytics</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-bold">Team Analysis</h2>
                  <p className="text-text-secondary text-sm">Get instant data-driven analysis of your team's rating.</p>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="flex flex-col gap-4 rounded-xl border border-border-light bg-surface-dark p-6 hover:border-primary transition-colors duration-300 group">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">person</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-bold">Legends & Stars</h2>
                  <p className="text-text-secondary text-sm">
                    Access detailed stats for top current players and football icons.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Call to Action (Bottom Banner) */}
        <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-40 py-10 pb-20">
          <div className="mx-auto max-w-[960px]">
            <div className="flex flex-col justify-end gap-6 px-4 py-10 text-center bg-gradient-to-t from-surface-dark to-transparent rounded-xl border border-border-dark">
              <h1 className="text-[32px] md:text-4xl font-bold">Ready to Dominate?</h1>
              <div className="flex justify-center">
                <Link to="/register">
                  <button className="flex items-center justify-center rounded-lg h-12 px-8 bg-primary text-[#111814] text-base font-bold hover:bg-green-400 hover:scale-105 transition-all">
                    Sign Up Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
};

export default Home;