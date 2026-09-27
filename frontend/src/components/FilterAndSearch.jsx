import React from 'react';
import { motion } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export const FilterAndSearch = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  counts,
}) => {
  const filters = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter tasks by title..."
          className="w-full pl-10 pr-9 py-2.5 rounded-xl glass-input text-sm placeholder:text-slate-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800/80 self-start md:self-auto">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className="relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 z-10"
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md -z-10"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className={isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}>
                {filter.label}
              </span>
              <span
                className={`px-1.5 py-0.2 text-[10px] rounded-full font-mono ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
