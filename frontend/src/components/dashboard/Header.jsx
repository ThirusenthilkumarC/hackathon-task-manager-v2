import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Bell, Settings, LogOut, Check, Sparkles } from 'lucide-react';
import { logout, getCurrentUser } from '../../auth/auth';

export const DashboardHeader = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser() || { name: 'Thiru', email: 'thiru@example.com' };
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = ['Dashboard', 'Tasks', 'Settings'];

  return (
    <header className="w-full mb-8 pt-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-3 px-1 border-b border-gray-100 pb-5">
        {/* Left: Brand & Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 6 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-2xl bg-[#EAF3EA] border border-[#CBE0CE] flex items-center justify-center text-[#1B3B2B] shadow-xs shrink-0"
            >
              <Rocket className="w-5 h-5 text-[#1B3B2B]" />
            </motion.div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Hackathon Task Manager
              </h1>
              <p className="text-[11px] text-slate-500 font-semibold font-mono">
                v2.0 • Render + Supabase
              </p>
            </div>
          </div>

          {/* Navigation Items (Pills) */}
          <nav className="flex items-center gap-1 p-1 rounded-full bg-slate-100/80 border border-gray-200">
            {navItems.map((item) => {
              const isActive = activeTab === item;
              return (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="headerNavPill"
                      className="absolute inset-0 bg-white rounded-full shadow-xs border border-gray-200/80 -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  {item}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Notification, Profile Avatar, Logout */}
        <div className="flex items-center gap-2.5 sm:gap-3 self-end md:self-auto">
          {/* Notification Button & Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-full bg-white border border-gray-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#1B3B2B] ring-2 ring-white" />
            </motion.button>

            {/* Notification Popover */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-gray-200 shadow-xl p-4 z-50 text-xs"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                  <span className="font-bold text-slate-900">Notifications</span>
                  <span className="text-[10px] bg-[#EAF3EA] text-[#1B3B2B] px-2 py-0.5 rounded-full font-semibold">
                    1 New
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-gray-100">
                  <Sparkles className="w-4 h-4 text-[#1B3B2B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800">API Sync Active</p>
                    <p className="text-slate-500 text-[11px]">Tasks synced with Render backend.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* User Profile Avatar & Name */}
          <div className="flex items-center gap-2.5 pl-1.5 sm:pl-2">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[#1B3B2B] text-white flex items-center justify-center text-xs font-extrabold tracking-wider shadow-xs uppercase">
                {currentUser.name ? currentUser.name.slice(0, 2) : 'TH'}
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-xs font-extrabold text-slate-900">
                {currentUser.name}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {currentUser.email}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-gray-200 hover:border-rose-200 transition-colors cursor-pointer shadow-xs ml-1"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </header>
  );
};
