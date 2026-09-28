import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles, FolderPlus } from 'lucide-react';

export const EmptyState = ({ searchQuery, activeFilter }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="saas-card p-10 sm:p-14 rounded-3xl text-center border border-gray-200 bg-white my-4 relative overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
        {/* Original Minimal CSS/SVG Graphic Icon */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-2xl bg-[#EAF3EA] border border-[#CBE0CE] flex items-center justify-center text-[#1B3B2B] mb-4 shadow-xs"
        >
          {searchQuery ? (
            <Layers className="w-8 h-8 text-[#1B3B2B]" />
          ) : (
            <FolderPlus className="w-8 h-8 text-[#1B3B2B]" />
          )}
        </motion.div>

        <h3 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">
          {searchQuery
            ? 'No matching tasks'
            : activeFilter !== 'all'
            ? `No ${activeFilter} tasks`
            : 'No tasks yet'}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 mb-5 font-medium leading-relaxed">
          {searchQuery
            ? `No tasks matched "${searchQuery}". Try a different keyword or reset filters.`
            : 'Your workspace is ready. Create your first task and start making progress.'}
        </p>

        {!searchQuery && activeFilter === 'all' && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EAF3EA] border border-[#CBE0CE] text-[#1B3B2B] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#1B3B2B]" />
            <span>Ready for your hackathon sprint</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
