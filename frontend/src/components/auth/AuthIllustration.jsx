import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, FolderCheck, Trophy, Layers } from 'lucide-react';

export const AuthIllustration = () => {
  return (
    <div className="w-full h-full min-h-[520px] bg-[#F4F7F4] border border-[#E2EDE3] rounded-3xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Ambient Decorative Circles */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-[#E2EDE3]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-[#EAF3EA]/70 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="relative z-10 flex justify-between items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-xs border border-[#CBE0CE] text-[#1B3B2B] text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#1B3B2B]" />
          <span>Productivity Redefined</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#EAF3EA] border border-[#CBE0CE] flex items-center justify-center text-[#1B3B2B]">
          <Layers className="w-4 h-4" />
        </div>
      </div>

      {/* Middle Visual Area: Original Abstract Productivity Visual */}
      <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center">
        {/* Soft Circular Decorative Arc */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Abstract background concentric rings */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#CBE0CE]/60 animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full bg-white/60 backdrop-blur-xs border border-[#E2EDE3]" />

          {/* Central Productivity Badge */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-3xl bg-[#1B3B2B] text-white flex flex-col items-center justify-center shadow-lg relative z-20"
          >
            <FolderCheck className="w-10 h-10 text-[#EAF3EA] mb-1" />
            <span className="text-[10px] font-bold tracking-wider font-mono uppercase text-[#EAF3EA]">
              Ship v2.0
            </span>
          </motion.div>

          {/* Floating Task Card 1 (Top Left) */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-2 -left-4 sm:-left-8 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-md flex items-center gap-3 z-30 min-w-[170px]"
          >
            <div className="w-6 h-6 rounded-full bg-[#EAF3EA] text-[#1B3B2B] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Complete portfolio</div>
              <div className="text-[10px] text-slate-500 font-mono">100% Done</div>
            </div>
          </motion.div>

          {/* Floating Task Card 2 (Bottom Right) */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="absolute bottom-2 -right-4 sm:-right-8 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-md flex items-center gap-3 z-30 min-w-[160px]"
          >
            <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Trophy className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Submit hackathon</div>
              <div className="text-[10px] text-emerald-700 font-semibold">Priority • High</div>
            </div>
          </motion.div>

          {/* Floating Task Card 3 (Middle Right) */}
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute top-1/2 -right-6 -translate-y-1/2 bg-[#1B3B2B] text-white p-2.5 px-3.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold z-40 hidden sm:flex"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Build project</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Message & Pagination Dots */}
      <div className="relative z-10 text-center space-y-3 pt-4 border-t border-[#E2EDE3]/80">
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5">
          <span className="w-5 h-1.5 rounded-full bg-[#1B3B2B]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#CBE0CE]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#CBE0CE]" />
        </div>

        <div className="space-y-1">
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            Make your work simpler,
          </p>
          <p className="text-sm font-semibold text-slate-600">
            one task at a time.
          </p>
        </div>
      </div>
    </div>
  );
};
