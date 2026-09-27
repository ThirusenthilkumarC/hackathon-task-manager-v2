import React from 'react';
import { motion } from 'framer-motion';
import { ListTodo, CheckCircle2, Clock, Activity } from 'lucide-react';

export const StatsSummary = ({ totalTasks, completedTasks, pendingTasks }) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      id: 'total',
      label: 'Total Tasks',
      value: totalTasks,
      icon: ListTodo,
      color: 'from-blue-500/20 to-indigo-500/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      badge: 'All items',
    },
    {
      id: 'completed',
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      badge: 'Done',
    },
    {
      id: 'pending',
      label: 'Pending',
      value: pendingTasks,
      icon: Clock,
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
      badge: 'In Progress',
    },
    {
      id: 'rate',
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: Activity,
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
      badge: 'Efficiency',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.id}
            variants={cardVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={`glass-card p-4 sm:p-5 rounded-2xl relative overflow-hidden group`}
          >
            {/* Background Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
            />

            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className={`p-2.5 rounded-xl bg-slate-900/80 border ${stat.borderColor} ${stat.iconColor} shadow-inner`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50">
                {stat.badge}
              </span>
            </div>

            <div className="relative z-10">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight font-mono">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-slate-400 mt-1">
                {stat.label}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
