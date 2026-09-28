import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskCard } from './TaskCard';
import { EmptyState } from './EmptyState';
import { SkeletonLoader } from './SkeletonLoader';

export const TaskList = ({
  tasks,
  isLoading,
  searchQuery,
  activeFilter,
  onCompleteTask,
  onDeleteTask,
}) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (tasks.length === 0) {
    return <EmptyState searchQuery={searchQuery} activeFilter={activeFilter} />;
  }

  return (
    <motion.div layout className="space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={onCompleteTask}
            onDelete={onDeleteTask}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
