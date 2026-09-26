import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Load tasks when page opens
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!task.trim()) {
      alert("Please enter a task");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add task");
      }

      // Add newly created task to UI
      setTasks((prevTasks) => [data, ...prevTasks]);

      // Clear input
      setTask("");
    } catch (error) {
      console.error("Add task error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete task");
      }

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  };

  // Complete task
  const completeTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedTask = await response.json();

      if (!response.ok) {
        throw new Error(
          updatedTask.error || "Failed to complete task"
        );
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Complete error:", error);
      alert(error.message);
    }
  };

  // Press Enter to add task
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#111827",
            color: "white",
            padding: "30px",
            borderRadius: "18px",
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
            }}
          >
            🚀 Hackathon Task Manager
          </h1>

          <p
            style={{
              marginBottom: 0,
              color: "#cbd5e1",
            }}
          >
            React + Node.js + Express + Supabase
          </p>
        </div>

        {/* Add Task */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            display: "flex",
            gap: "10px",
            marginBottom: "25px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >
          <input
            type="text"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a new task..."
            style={{
              flex: 1,
              padding: "14px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <button
            onClick={addTask}
            disabled={loading}
            style={{
              padding: "14px 22px",
              border: "none",
              borderRadius: "10px",
              background: loading ? "#9ca3af" : "#2563eb",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </div>

        {/* Task List */}
        <div>
          {tasks.length === 0 ? (
            <div
              style={{
                background: "white",
                padding: "50px 20px",
                borderRadius: "16px",
                textAlign: "center",
                color: "#6b7280",
                boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: "40px" }}>📋</div>

              <h3>No tasks yet</h3>

              <p>Add your first task above.</p>
            </div>
          ) : (
            tasks.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "white",
                  padding: "18px 20px",
                  borderRadius: "14px",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "15px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                }}
              >
                {/* Task title */}
                <div
                  style={{
                    flex: 1,
                    textDecoration: item.completed
                      ? "line-through"
                      : "none",
                    color: item.completed
                      ? "#9ca3af"
                      : "#111827",
                    fontSize: "17px",
                  }}
                >
                  {item.title}
                </div>

                {/* Buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  {!item.completed && (
                    <button
                      onClick={() => completeTask(item.id)}
                      style={{
                        border: "none",
                        background: "#dcfce7",
                        color: "#166534",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      ✓
                    </button>
                  )}

                  <button
                    onClick={() => deleteTask(item.id)}
                    style={{
                      border: "none",
                      background: "#fee2e2",
                      color: "#991b1b",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          <p>
            Frontend: React + Vite | Backend: Node.js + Express |
            Database: Supabase PostgreSQL
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;