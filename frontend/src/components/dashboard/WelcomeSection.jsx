import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, TrendingUp, Clock, Calendar } from 'lucide-react';
import { getCurrentUser } from '../../auth/auth';

export const WelcomeSection = ({ totalTasks, completedTasks, pendingTasks }) => {
  const currentUser = getCurrentUser() || { name: 'Thiru' };
  const userName = currentUser.name ? currentUser.name.split(' ')[0] : 'Thiru';

  // Determine greeting based on current local hour
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return `Good morning, ${userName} 👋`;
    if (hour < 18) return `Good afternoon, ${userName} 👋`;
    return `Good evening, ${userName} 👋`;
  }, [userName]);

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="saas-hero-panel p-6 sm:p-10 rounded-3xl mb-8 relative overflow-hidden"
    >
      {/* Background ambient soft green blobs */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-[#E2EDE3]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-[#EAF3EA]/70 rounded-full blur-2xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Side: Greeting & Description */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3EA] border border-[#CBE0CE] text-[#1B3B2B] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#1B3B2B]" />
            <span>Productivity Dashboard</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {greeting}
            </h2>
            <p className="text-lg sm:text-xl font-bold text-slate-700 tracking-tight">
              Let's get your work organized and keep moving forward.
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-lg">
            Stay focused, track your goals, and manage your tasks seamlessly.
          </p>

          {/* Quick Stat Badges */}
          <div className="pt-2 flex items-center gap-3 flex-wrap text-xs text-slate-600">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200/80 shadow-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#1B3B2B]" />
              <span>{pendingTasks} pending tasks</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200/80 shadow-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>{completionPercentage}% complete</span>
            </div>
          </div>
        </div>

        {/* Right Side: Soft Sage-Green Productivity Visual */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-sm relative z-10"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#1B3B2B]" />
                  <span className="text-xs font-bold text-slate-800 tracking-wide uppercase font-mono">
                    Workspace Overview
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#1B3B2B] bg-[#EAF3EA] px-2.5 py-0.5 rounded-full border border-[#CBE0CE]">
                  Active
                </span>
              </div>

              {/* Simulated Task Card */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8FAF8] border border-[#E8EFE8] mb-2.5">
                <div className="w-5 h-5 rounded-md bg-[#1B3B2B] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-800 truncate">Authentication Redesign</div>
                  <div className="text-[10px] text-slate-500 font-mono">Completed • Today</div>
                </div>
              </div>

              {/* Simulated In Progress Card */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-gray-100 mb-3">
                <div className="w-5 h-5 rounded-md border-2 border-gray-300 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-700 truncate">Render REST API Integration</div>
                  <div className="text-[10px] text-slate-400 font-mono">In Progress</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-medium text-slate-600">
                  <span>Task Completion Rate</span>
                  <span className="font-bold text-slate-900">{completionPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-[#1B3B2B] rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Decorative Floating Pill Badges */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 bg-white py-2 px-3.5 rounded-full border border-gray-200 shadow-sm flex items-center gap-2 text-xs font-semibold text-slate-800 z-20"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Workspace</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-3 -right-3 bg-[#1B3B2B] text-white py-2 px-3.5 rounded-full shadow-md flex items-center gap-2 text-xs font-semibold z-20"
            >
              <Calendar className="w-3.5 h-3.5 text-[#EAF3EA]" />
              <span>Goal Focused</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
