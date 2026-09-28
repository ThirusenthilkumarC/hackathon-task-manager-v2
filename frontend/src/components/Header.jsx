import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Bell, Settings, ShieldCheck } from 'lucide-react';

export const Header = () => {
  return (
    <header className="w-full mb-8 pt-2">
      <div className="flex items-center justify-between gap-4 py-3 px-1 border-b border-gray-100 pb-5">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 6 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-2xl bg-[#EAF3EA] border border-[#CBE0CE] flex items-center justify-center text-[#1B3B2B] shadow-xs shrink-0"
          >
            <Rocket className="w-5 h-5 text-[#1B3B2B]" />
          </motion.div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                Hackathon Task Manager
              </h1>
              <span className="hidden xs:inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-[#EAF3EA] border border-[#CBE0CE] text-[#1B3B2B]">
                Plan. Track. Ship.
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium sm:hidden">
              Plan. Track. Ship.
            </p>
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2.5 rounded-full bg-white border border-gray-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#1B3B2B] ring-2 ring-white" />
          </motion.button>

          {/* Settings Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-full bg-white border border-gray-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </motion.button>

          {/* User Avatar & Workspace */}
          <div className="flex items-center gap-2.5 pl-1.5 sm:pl-2">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold tracking-wider shadow-xs">
                HK
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="hidden md:block text-left leading-tight">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                Builder Workspace
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B3B2B]" />
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Render + Supabase</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
