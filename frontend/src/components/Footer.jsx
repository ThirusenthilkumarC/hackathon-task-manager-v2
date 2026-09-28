import React from 'react';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="mt-16 text-center text-xs text-slate-500 border-t border-gray-100 pt-8 pb-8 font-medium">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto px-2">
        {/* Creator Name */}
        <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
          <span>Built by</span>
          <span className="text-slate-900 font-extrabold tracking-tight">
            Thirusenthilkumar C
          </span>
        </div>

        {/* Tech Stack Info */}
        <div className="text-[11px] text-slate-400 font-mono hidden md:flex items-center gap-2">
          <span>Hackathon Task Manager</span>
          <span>•</span>
          <span>React + Render + Supabase</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {/* LinkedIn Button */}
          <motion.a
            href="https://www.linkedin.com/in/thirusenthilkumar"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="px-4 py-2 rounded-full border border-gray-200 bg-white hover:bg-slate-50 text-slate-800 hover:text-[#0A66C2] text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current shrink-0 text-[#0A66C2]" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
            </svg>
            <span>LinkedIn</span>
          </motion.a>

          {/* GitHub Button */}
          <motion.a
            href="https://github.com/ThirusenthilkumarC"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="px-4 py-2 rounded-full border border-gray-200 bg-white hover:bg-slate-50 text-slate-800 hover:text-black text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 fill-slate-900 shrink-0" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
};
