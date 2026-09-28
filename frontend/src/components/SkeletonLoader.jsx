import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="space-y-3 my-2">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="saas-card p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-4 border border-gray-200 bg-white"
        >
          <div className="flex items-center gap-3.5 flex-1">
            <div className="w-6 h-6 rounded-full skeleton-shimmer shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded-full skeleton-shimmer" />
              <div className="h-3 w-1/3 rounded-full skeleton-shimmer" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-7 rounded-full skeleton-shimmer hidden sm:block" />
            <div className="w-8 h-8 rounded-full skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const LoadingSkeleton = SkeletonLoader;
