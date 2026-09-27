import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles, FolderPlus } from 'lucide-react';

export const EmptyState = ({ searchQuery, activeFilter }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass-panel p-8 sm:p-12 rounded-2xl text-center border border-slate-800/80 my-4 relative overflow-hidden"
    >
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 shadow-xl shadow-indigo-500/10"
        >
          {searchQuery ? (
            <Layers className="w-8 h-8" />
          ) : (
            <FolderPlus className="w-8 h-8" />
          )}
        </motion.div>

        <h3 className="text-xl font-bold text-slate-100 mb-1">
          {searchQuery
            ? 'No matching tasks'
            : activeFilter !== 'all'
            ? `No ${activeFilter} tasks`
            : 'No tasks found'}
        </h3>

        <p className="text-sm text-slate-400 max-w-sm mb-4 font-medium">
          {searchQuery
            ? `No tasks matched "${searchQuery}". Try a different keyword.`
            : 'Create a task and start building.'}
        </p>

        {!searchQuery && activeFilter === 'all' && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Ready for your hackathon sprint</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
