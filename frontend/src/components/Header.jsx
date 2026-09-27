import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, ShieldCheck, Zap } from 'lucide-react';

export const Header = () => {
  return (
    <header className="relative z-10 w-full mb-8">
      {/* Top Ambient Glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-32 bg-indigo-600/15 blur-3xl rounded-full pointer-events-none" />

      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          {/* Logo & Title */}
          <div className="flex items-start sm:items-center gap-4">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 text-indigo-400 shadow-lg shadow-indigo-500/10 shrink-0"
            >
              <Terminal className="w-7 h-7 sm:w-8 sm:h-8" />
            </motion.div>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight gradient-text">
                  Hackathon Task Manager
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-indigo-400" /> v2.0
                </span>
              </div>
              <p className="text-sm text-slate-400 font-medium">
                Stay focused. Ship faster.
              </p>
            </div>
          </div>

          {/* Profile & Tech Stack Badge */}
          <div className="flex items-center gap-3 sm:gap-4 self-start md:self-auto flex-wrap">
            {/* Supabase & Render Status Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Supabase Live</span>
            </div>

            {/* Profile Avatar / User Badge */}
            <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  DEV
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div className="text-left hidden xs:block">
                <div className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                  Builder Workspace
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div className="text-[11px] text-slate-400 font-mono">React + Render</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
