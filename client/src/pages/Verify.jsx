import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar'; // Assuming you want the nav visible

const Verify = () => {
  const { token } = useParams(); // Grab the token from the URL
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Replace with your actual backend URL if different
        // Note: We use fetch here to keep it simple, or use your axios instance
        const response = await fetch(`http://localhost:5000/api/auth/verify/${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage("Email Verified Successfully! Welcome to the club.");
        } else {
          setStatus('error');
          setMessage(data.message || "Verification Failed.");
        }
      } catch (error) {
        setStatus('error');
        setMessage("Something went wrong. Please try again.");
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[#0d1110] text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#121614] border border-[#2a3b32] rounded-lg shadow-2xl p-8 text-center relative overflow-hidden">
          
          {/* Neon Glow Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#13ec6d] to-transparent opacity-50"></div>

          {/* --- LOADING STATE --- */}
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-4">
              <span className="material-symbols-outlined text-5xl text-[#13ec6d] animate-spin">
                progress_activity
              </span>
              <h2 className="text-xl font-bold text-white">Verifying Account...</h2>
              <p className="text-gray-400 text-sm">Please wait while we secure your spot on the pitch.</p>
            </div>
          )}

          {/* --- SUCCESS STATE --- */}
          {status === 'success' && (
            <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 rounded-full bg-[#13ec6d]/10 flex items-center justify-center border-2 border-[#13ec6d] shadow-[0_0_20px_rgba(19,236,109,0.3)]">
                <span className="material-symbols-outlined text-5xl text-[#13ec6d]">check_circle</span>
              </div>
              
              <h2 className="text-2xl font-black uppercase italic tracking-wider text-white">
                Account Verified
              </h2>
              
              <p className="text-gray-400 text-sm mb-4">
                {message}
              </p>

              <Link 
                to="/login"
                className="w-full py-3 bg-[#13ec6d] hover:bg-[#10d460] text-[#0d1110] font-black uppercase tracking-wider rounded text-sm transition-transform active:scale-95 shadow-[0_0_20px_rgba(19,236,109,0.2)] flex items-center justify-center gap-2"
              >
                Login Now
              </Link>
            </div>
          )}

          {/* --- ERROR STATE --- */}
          {status === 'error' && (
            <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                <span className="material-symbols-outlined text-5xl text-red-500">error</span>
              </div>

              <h2 className="text-2xl font-black uppercase italic tracking-wider text-white">
                Verification Failed
              </h2>

              <p className="text-gray-400 text-sm mb-4">
                {message}
              </p>

              <Link 
                to="/register"
                className="text-sm text-[#13ec6d] hover:underline uppercase font-bold tracking-wide"
              >
                Return to Registration
              </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Verify;