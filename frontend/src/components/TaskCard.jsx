import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export const TaskCard = ({ task, onComplete, onDelete }) => {
  // Format creation date gracefully
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently added';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Recently added';
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return 'Recently added';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, height: 0, marginBottom: 0, padding: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`glass-card p-4 sm:p-5 rounded-2xl mb-3 flex items-start sm:items-center justify-between gap-4 group relative ${
        task.completed
          ? 'bg-slate-950/40 border-slate-800/50 opacity-80'
          : 'hover:border-indigo-500/30'
      }`}
    >
      <div className="flex items-start gap-3.5 flex-1 min-w-0">
        {/* Custom Animated Checkbox / Complete Control */}
        <motion.button
          onClick={() => !task.completed && onComplete(task.id)}
          disabled={task.completed}
          whileHover={{ scale: task.completed ? 1 : 1.1 }}
          whileTap={{ scale: task.completed ? 1 : 0.9 }}
          className={`mt-0.5 sm:mt-0 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all cursor-pointer ${
            task.completed
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 cursor-default'
              : 'border border-slate-600 hover:border-indigo-400 bg-slate-900/60 text-transparent hover:text-indigo-400/40'
          }`}
          title={task.completed ? 'Task completed' : 'Mark as complete'}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </motion.button>

        {/* Task Title & Metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3
              className={`text-base font-semibold transition-all break-words ${
                task.completed
                  ? 'line-through text-slate-400 font-normal'
                  : 'text-slate-100 group-hover:text-indigo-100'
              }`}
            >
              {task.title}
            </h3>

            {/* Completion Status Badge */}
            {task.completed ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Completed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
                <Clock className="w-3 h-3 text-amber-400" /> Pending
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatDate(task.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {!task.completed && (
          <motion.button
            onClick={() => onComplete(task.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Complete</span>
          </motion.button>
        )}

        <motion.button
          onClick={() => onDelete(task.id)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/15 hover:border hover:border-rose-500/30 transition-all cursor-pointer"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};
