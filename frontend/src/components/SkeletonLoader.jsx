import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="glass-panel p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-4 border border-slate-800/60"
        >
          <div className="flex items-center gap-3.5 flex-1">
            <div className="w-6 h-6 rounded-lg skeleton-shimmer shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded skeleton-shimmer" />
              <div className="h-3 w-1/3 rounded skeleton-shimmer" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
};
