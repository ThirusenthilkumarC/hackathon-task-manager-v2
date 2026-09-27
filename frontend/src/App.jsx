import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./components/Header";
import { StatsSummary } from "./components/StatsSummary";
import { AddTaskCard } from "./components/AddTaskCard";
import { FilterAndSearch } from "./components/FilterAndSearch";
import { TaskCard } from "./components/TaskCard";
import { SkeletonLoader } from "./components/SkeletonLoader";
import { EmptyState } from "./components/EmptyState";
import { ToastContainer } from "./components/Toast";

const API_URL = "https://hackathon-task-manager-backend.onrender.com/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskLoading, setTaskLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch all tasks
  const fetchTasks = async () => {
    setIsInitialLoading(true);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks from backend server");
      }

      const data = await response.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
      addToast(error.message || "Failed to load tasks", "error");
    } finally {
      setIsInitialLoading(false);
    }
  };

  // Load tasks on initial mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const handleAddTask = async (title) => {
    setTaskLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add task");
      }

      // Add newly created task to state
      setTasks((prev) => [data, ...prev]);
      addToast("Task added successfully!", "success");
    } catch (error) {
      console.error("Add task error:", error);
      addToast(error.message || "Could not create task", "error");
    } finally {
      setTaskLoading(false);
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete task");
      }

      setTasks((prev) => prev.filter((t) => t.id !== id));
      addToast("Task deleted", "delete");
    } catch (error) {
      console.error("Delete error:", error);
      addToast(error.message || "Could not delete task", "error");
    }
  };

  // Complete task
  const handleCompleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedTask = await response.json();

      if (!response.ok) {
        throw new Error(updatedTask.error || "Failed to complete task");
      }

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updatedTask : t))
      );
      addToast("Task marked as completed!", "success");
    } catch (error) {
      console.error("Complete error:", error);
      addToast(error.message || "Could not complete task", "error");
    }
  };

  // Filter & Search Logic
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = t.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      if (activeFilter === "completed") {
        return matchesSearch && t.completed;
      }
      if (activeFilter === "pending") {
        return matchesSearch && !t.completed;
      }
      return matchesSearch;
    });
  }, [tasks, searchQuery, activeFilter]);

  // Task Statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const counts = {
    all: totalTasks,
    completed: completedTasks,
    pending: pendingTasks,
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 px-4 py-6 sm:py-10 relative selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="max-w-5xl mx-auto">
        {/* Main Dashboard Header */}
        <Header />

        {/* Dashboard Statistics Summary */}
        <StatsSummary
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
        />

        {/* Add Task Input Card */}
        <AddTaskCard onAddTask={handleAddTask} loading={taskLoading} />

        {/* Filter and Search Bar */}
        <FilterAndSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          counts={counts}
        />

        {/* Task List Section */}
        <div className="min-h-[260px] relative">
          {isInitialLoading ? (
            <SkeletonLoader />
          ) : filteredTasks.length === 0 ? (
            <EmptyState searchQuery={searchQuery} activeFilter={activeFilter} />
          ) : (
            <motion.div layout className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={handleCompleteTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Dashboard Footer */}
        <footer className="mt-16 text-center text-xs text-slate-400 border-t border-slate-900 pt-8 pb-4 font-mono">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            <span>Frontend: React + Vite + Framer Motion</span>
            <span className="text-slate-700">•</span>
            <span>Backend: Node.js + Express (Render)</span>
            <span className="text-slate-700">•</span>
            <span>Database: Supabase</span>
          </p>
        </footer>
      </div>

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;