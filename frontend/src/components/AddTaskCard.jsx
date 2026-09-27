import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Loader2, CornerDownLeft } from 'lucide-react';

export const AddTaskCard = ({ onAddTask, loading }) => {
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
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      className="glass-panel p-4 sm:p-5 rounded-2xl mb-8 border border-slate-800/80 shadow-xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to get done? (Press Enter to add...)"
            disabled={loading}
            className="w-full px-4 py-3.5 pr-20 rounded-xl glass-input text-sm placeholder:text-slate-500 disabled:opacity-60 disabled:cursor-not-allowed"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden xs:flex items-center gap-1 text-[11px] font-mono text-slate-500 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded-md pointer-events-none">
            <span>Enter</span>
            <CornerDownLeft className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading || !taskTitle.trim()}
          whileHover={{ scale: loading || !taskTitle.trim() ? 1 : 1.02 }}
          whileTap={{ scale: loading || !taskTitle.trim() ? 1 : 0.98 }}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none shrink-0"
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
