import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-40 py-10 bg-background-dark border-t border-border-dark mt-auto">
      <div className="mx-auto max-w-[960px]">
        
        {/* Top Section: Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 px-4">
          <p className="text-sm text-white/60">© 2025 Pitch Master. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/info/terms" className="text-sm text-white/60 hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/info/privacy" className="text-sm text-white/60 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/info/contact" className="text-sm text-white/60 hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>

        {/* Bottom Section: Credits (NOW INSIDE THE COMPONENT) */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-end gap-4 text-xs text-white/40">
          <div className="flex items-center gap-4">
             <Link to="/developer" className="flex items-center gap-1 hover:text-white transition-colors group">
               Built by 
               <span className="text-primary font-bold group-hover:text-green-400 transition-colors">
                 Enyinnia Joseph C.
               </span>
             </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;