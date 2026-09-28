import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Loader2, CornerDownLeft } from 'lucide-react';

export const TaskInput = ({ onAddTask, loading }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim() || loading) return;
    onAddTask(taskTitle.trim());
    setTaskTitle('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
      className="saas-card p-6 sm:p-8 rounded-3xl mb-8 border border-gray-200 bg-white"
    >
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          Create a new task
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Add something you want to accomplish.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your task..."
            disabled={loading}
            className="w-full px-5 py-3.5 pr-24 rounded-full saas-input text-sm text-slate-900 placeholder:text-slate-400 disabled:opacity-60 disabled:cursor-not-allowed shadow-xs"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden xs:flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full pointer-events-none border border-gray-200">
            <span>Enter</span>
            <CornerDownLeft className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading || !taskTitle.trim()}
          whileHover={{ scale: loading || !taskTitle.trim() ? 1 : 1.02 }}
          whileTap={{ scale: loading || !taskTitle.trim() ? 1 : 0.98 }}
          className="px-7 py-3.5 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export const AddTaskCard = TaskInput;
