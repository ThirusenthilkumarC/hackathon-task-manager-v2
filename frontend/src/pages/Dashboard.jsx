import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardHeader } from '../components/dashboard/Header';
import { WelcomeSection } from '../components/dashboard/WelcomeSection';
import { StatsCards } from '../components/StatsCards';
import { TaskInput } from '../components/TaskInput';
import { TaskFilters } from '../components/TaskFilters';
import { TaskList } from '../components/TaskList';
import { ToastContainer } from '../components/Toast';
import { Footer } from '../components/Footer';
import { isAuthenticated } from '../auth/auth';

const API_URL = 'https://hackathon-task-manager-backend.onrender.com/api/tasks';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [tasks, setTasks] = useState([]);
  const [taskLoading, setTaskLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [toasts, setToasts] = useState([]);

  // Check Protection & Redirect
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // Toast Helper
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch all tasks from real Render API
  const fetchTasks = async () => {
    setIsInitialLoading(true);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch tasks from backend server');
      }

      const data = await response.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Fetch error:', error);
      addToast(error.message || 'Failed to load tasks from server', 'error');
    } finally {
      setIsInitialLoading(false);
    }
  };

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task via POST request
  const handleAddTask = async (title) => {
    setTaskLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add task');
      }

      setTasks((prev) => [data, ...prev]);
      addToast('Task added successfully!', 'success');
    } catch (error) {
      console.error('Add task error:', error);
      addToast(error.message || 'Could not create task', 'error');
    } finally {
      setTaskLoading(false);
    }
  };

  // Delete task via DELETE request
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete task');
      }

      setTasks((prev) => prev.filter((t) => t.id !== id));
      addToast('Task deleted', 'delete');
    } catch (error) {
      console.error('Delete error:', error);
      addToast(error.message || 'Could not delete task', 'error');
    }
  };

  // Complete task via PATCH request
  const handleCompleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const updatedTask = await response.json();

      if (!response.ok) {
        throw new Error(updatedTask.error || 'Failed to complete task');
      }

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updatedTask : t))
      );
      addToast('Task marked as completed!', 'success');
    } catch (error) {
      console.error('Complete error:', error);
      addToast(error.message || 'Could not complete task', 'error');
    }
  };

  // Filter & Search Logic
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = t.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      if (activeFilter === 'completed') {
        return matchesSearch && t.completed;
      }
      if (activeFilter === 'pending') {
        return matchesSearch && !t.completed;
      }
      return matchesSearch;
    });
  }, [tasks, searchQuery, activeFilter]);

  // Statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const counts = {
    all: totalTasks,
    completed: completedTasks,
    pending: pendingTasks,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white text-slate-900 px-4 py-6 sm:py-10 relative selection:bg-[#EAF3EA] selection:text-[#1B3B2B]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Navigation Header */}
        <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Views */}
        {activeTab === 'Settings' ? (
          <div className="saas-card p-8 rounded-3xl border border-gray-200 text-center my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Workspace Settings</h3>
            <p className="text-sm text-slate-500 font-medium">
              Configure your productivity preferences, notifications, and profile details.
            </p>
          </div>
        ) : (
          <>
            {/* Hero Welcome Banner */}
            <WelcomeSection
              totalTasks={totalTasks}
              completedTasks={completedTasks}
              pendingTasks={pendingTasks}
            />

            {/* 4 Summary Cards */}
            <StatsCards
              totalTasks={totalTasks}
              completedTasks={completedTasks}
              pendingTasks={pendingTasks}
            />

            {/* Create Task Input Card */}
            <TaskInput onAddTask={handleAddTask} loading={taskLoading} />

            {/* Task Filters & Search */}
            <TaskFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              counts={counts}
            />

            {/* Task List Area */}
            <div className="min-h-[260px] relative">
              <TaskList
                tasks={filteredTasks}
                isLoading={isInitialLoading}
                searchQuery={searchQuery}
                activeFilter={activeFilter}
                onCompleteTask={handleCompleteTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </>
        )}

        {/* Updated Footer with Creator Social Links */}
        <Footer />
      </div>

      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </motion.div>
  );
};

export default Dashboard;
