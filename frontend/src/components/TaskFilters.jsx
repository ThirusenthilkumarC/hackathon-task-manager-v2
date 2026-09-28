import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

export const TaskFilters = ({
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
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Section Heading */}
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Your Tasks
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage, filter, and track your daily priorities.
          </p>
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-9 py-2.5 rounded-full saas-input text-xs text-slate-900 placeholder:text-slate-400 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs (Pills) */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-slate-100/80 border border-gray-200 self-start inline-flex">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className="relative px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 z-10 cursor-pointer"
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-[#1B3B2B] rounded-full shadow-xs -z-10"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className={isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'}>
                {filter.label}
              </span>
              <span
                className={`px-2 py-0.5 text-[10px] rounded-full font-mono transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200/80 text-slate-600'
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

export const FilterAndSearch = TaskFilters;
