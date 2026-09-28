import React from 'react';
import { motion } from 'framer-motion';
import { ListTodo, CheckCircle2, Clock, PieChart } from 'lucide-react';

export const StatsCards = ({ totalTasks, completedTasks, pendingTasks }) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      id: 'total',
      label: 'TOTAL TASKS',
      value: totalTasks,
      icon: ListTodo,
      badge: 'All Items',
      accentBg: 'bg-slate-50',
      iconColor: 'text-slate-700',
    },
    {
      id: 'completed',
      label: 'COMPLETED',
      value: completedTasks,
      icon: CheckCircle2,
      badge: 'Done',
      accentBg: 'bg-[#EAF3EA]',
      iconColor: 'text-[#1B3B2B]',
    },
    {
      id: 'pending',
      label: 'PENDING',
      value: pendingTasks,
      icon: Clock,
      badge: 'In Progress',
      accentBg: 'bg-amber-50',
      iconColor: 'text-amber-700',
    },
    {
      id: 'rate',
      label: 'COMPLETION',
      value: `${completionRate}%`,
      icon: PieChart,
      badge: 'Efficiency',
      accentBg: 'bg-[#EAF3EA]',
      iconColor: 'text-[#1B3B2B]',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
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
            whileHover={{ y: -2 }}
            className="saas-card p-5 rounded-2xl relative overflow-hidden bg-white border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${stat.accentBg} ${stat.iconColor} shrink-0`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 tracking-wide font-mono">
                {stat.badge}
              </span>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                {stat.value}
              </div>
              <div className="text-[11px] font-bold tracking-wider text-slate-500 mt-1 uppercase">
                {stat.label}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export const StatsSummary = StatsCards;
