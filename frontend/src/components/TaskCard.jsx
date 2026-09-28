import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export const TaskCard = ({ task, onComplete, onDelete }) => {
  // Format creation date nicely
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
      exit={{ opacity: 0, scale: 0.94, height: 0, marginBottom: 0, padding: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`p-4 sm:p-5 rounded-2xl mb-3 flex items-start sm:items-center justify-between gap-4 transition-all border ${
        task.completed
          ? 'bg-[#F2F7F2] border-[#CBE0CE] text-slate-700 shadow-xs'
          : 'bg-white border-gray-200 hover:border-gray-300 text-slate-900 shadow-xs hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-3.5 flex-1 min-w-0">
        {/* Custom Pill Checkbox Control */}
        <motion.button
          onClick={() => !task.completed && onComplete(task.id)}
          disabled={task.completed}
          whileHover={{ scale: task.completed ? 1 : 1.1 }}
          whileTap={{ scale: task.completed ? 1 : 0.9 }}
          className={`mt-0.5 sm:mt-0 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
            task.completed
              ? 'bg-[#1B3B2B] text-white shadow-xs cursor-default'
              : 'border-2 border-slate-300 hover:border-[#1B3B2B] bg-white text-transparent hover:text-slate-300'
          }`}
          title={task.completed ? 'Task completed' : 'Mark as complete'}
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </motion.button>

        {/* Task Title & Metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap mb-1">
            <h3
              className={`text-base font-bold transition-all break-words ${
                task.completed
                  ? 'line-through text-slate-500 font-normal'
                  : 'text-slate-900'
              }`}
            >
              {task.title}
            </h3>

            {/* Status Badge */}
            {task.completed ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAF3EA] border border-[#CBE0CE] text-[#1B3B2B]">
                <CheckCircle2 className="w-3 h-3 text-[#1B3B2B]" /> Completed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
                <Clock className="w-3 h-3 text-amber-600" /> Pending
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#EAF3EA] border border-[#CBE0CE] text-[#1B3B2B] hover:bg-[#D8E8DA] transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Complete</span>
          </motion.button>
        )}

        <motion.button
          onClick={() => onDelete(task.id)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};
