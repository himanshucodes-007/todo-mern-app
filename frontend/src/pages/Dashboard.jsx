import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasks";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const emojiCloud = [
    // First set
    { icon: "💡", top: "10%", left: "8%", size: "text-3xl", duration: 4.5, delay: 0 },
    { icon: "✅", top: "25%", left: "85%", size: "text-2xl", duration: 5.2, delay: 0.8 },
    { icon: "📈", top: "45%", left: "12%", size: "text-4xl", duration: 4.8, delay: 0.4 },
    { icon: "⏱️", top: "65%", left: "78%", size: "text-3xl", duration: 5.5, delay: 1.1 },
    { icon: "📅", top: "15%", left: "65%", size: "text-2xl", duration: 4.2, delay: 0.2 },
    { icon: "🚀", top: "35%", left: "25%", size: "text-3xl", duration: 5.0, delay: 1.4 },
    { icon: "🧠", top: "75%", left: "35%", size: "text-3xl", duration: 4.6, delay: 0.6 },
    { icon: "🗂️", top: "85%", left: "70%", size: "text-2xl", duration: 5.3, delay: 1.7 },
    { icon: "📌", top: "55%", left: "90%", size: "text-2xl", duration: 4.4, delay: 0.3 },
    { icon: "🏆", top: "90%", left: "50%", size: "text-3xl", duration: 5.1, delay: 1.0 },
    { icon: "🧭", top: "5%", left: "42%", size: "text-2xl", duration: 4.7, delay: 0.5 },
    { icon: "📋", top: "50%", left: "5%", size: "text-xl", duration: 4.9, delay: 1.3 },
    { icon: "🔔", top: "70%", left: "60%", size: "text-2xl", duration: 5.4, delay: 0.9 },
    { icon: "📣", top: "30%", left: "50%", size: "text-2xl", duration: 4.3, delay: 1.8 },
    { icon: "🪴", top: "80%", left: "15%", size: "text-2xl", duration: 5.2, delay: 0.7 },
    // Second set
    { icon: "💡", top: "18%", left: "92%", size: "text-2xl", duration: 5.3, delay: 0.3 },
    { icon: "✅", top: "42%", left: "55%", size: "text-3xl", duration: 4.7, delay: 1.2 },
    { icon: "📈", top: "8%", left: "28%", size: "text-2xl", duration: 5.1, delay: 0.6 },
    { icon: "⏱️", top: "92%", left: "88%", size: "text-2xl", duration: 4.9, delay: 1.5 },
    { icon: "📅", top: "60%", left: "45%", size: "text-3xl", duration: 5.6, delay: 0.4 },
    { icon: "🚀", top: "22%", left: "72%", size: "text-2xl", duration: 4.4, delay: 1.6 },
    { icon: "🧠", top: "48%", left: "18%", size: "text-2xl", duration: 5.0, delay: 0.8 },
    { icon: "🗂️", top: "12%", left: "52%", size: "text-3xl", duration: 4.6, delay: 1.9 },
    { icon: "📌", top: "78%", left: "8%", size: "text-3xl", duration: 5.5, delay: 0.5 },
    { icon: "🏆", top: "38%", left: "82%", size: "text-2xl", duration: 4.8, delay: 1.3 },
    { icon: "🧭", top: "88%", left: "32%", size: "text-3xl", duration: 5.2, delay: 0.7 },
    { icon: "📋", top: "28%", left: "38%", size: "text-2xl", duration: 4.5, delay: 1.7 },
    { icon: "🔔", top: "52%", left: "68%", size: "text-3xl", duration: 5.4, delay: 1.0 },
    { icon: "📣", top: "72%", left: "92%", size: "text-2xl", duration: 4.3, delay: 0.2 },
    { icon: "🪴", top: "32%", left: "5%", size: "text-3xl", duration: 5.7, delay: 1.4 },
    // Third set
    { icon: "💡", top: "62%", left: "22%", size: "text-2xl", duration: 4.9, delay: 0.9 },
    { icon: "✅", top: "14%", left: "48%", size: "text-3xl", duration: 5.1, delay: 1.1 },
    { icon: "📈", top: "82%", left: "62%", size: "text-3xl", duration: 4.7, delay: 0.3 },
    { icon: "⏱️", top: "28%", left: "12%", size: "text-2xl", duration: 5.4, delay: 1.6 },
    { icon: "📅", top: "95%", left: "78%", size: "text-3xl", duration: 4.6, delay: 0.6 },
    { icon: "🚀", top: "52%", left: "42%", size: "text-2xl", duration: 5.2, delay: 1.8 },
    { icon: "🧠", top: "8%", left: "88%", size: "text-2xl", duration: 4.8, delay: 0.4 },
    { icon: "🗂️", top: "38%", left: "95%", size: "text-3xl", duration: 5.5, delay: 1.4 },
    { icon: "📌", top: "72%", left: "52%", size: "text-2xl", duration: 4.4, delay: 0.7 },
    { icon: "🏆", top: "18%", left: "18%", size: "text-3xl", duration: 5.0, delay: 1.2 },
    { icon: "🧭", top: "95%", left: "12%", size: "text-2xl", duration: 4.5, delay: 0.8 },
    { icon: "📋", top: "42%", left: "75%", size: "text-3xl", duration: 5.3, delay: 1.5 },
    { icon: "🔔", top: "88%", left: "42%", size: "text-2xl", duration: 4.7, delay: 0.5 },
    { icon: "📣", top: "58%", left: "8%", size: "text-3xl", duration: 5.6, delay: 1.9 },
    { icon: "🪴", top: "22%", left: "82%", size: "text-2xl", duration: 4.2, delay: 1.0 },
  ];

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const navigate = useNavigate();

  // ---------------- TOGGLE DARK MODE ----------------
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  // ---------------- LOGOUT ----------------
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate]);

  // ---------------- LOAD TASKS ----------------
  const loadTasks = useCallback(async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch {
      logout();
    }
  }, [logout]);

  // ---------------- PROTECT ROUTE ----------------
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  // ---------------- FETCH TASKS ----------------
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks();
  }, [loadTasks]);

  // ---------------- ADD TASK ----------------
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = await createTask(title);
    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
  };

  // ---------------- TOGGLE TASK ----------------
  const toggleTask = async (task) => {
    const updated = await updateTask(task._id, {
      completed: !task.completed,
    });

    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };

  // ---------------- DELETE TASK ----------------
  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className={`relative min-h-screen overflow-hidden p-6 transition-colors duration-300 ${
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 to-gray-800" 
        : "bg-gradient-to-br from-blue-50 to-indigo-100"
    }`}>
      <div className="pointer-events-none absolute inset-0">
        {emojiCloud.map((item, idx) => (
          <Motion.span
            key={idx}
            initial={{ y: 0, opacity: 0.4 }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              rotate: [-5, 5, -5],
              opacity: [0.2, 0.45, 0.2],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: item.delay,
            }}
            className={`absolute ${item.size}`}
            style={{ top: item.top, left: item.left }}
          >
            {item.icon}
          </Motion.span>
        ))}
      </div>

      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative z-10 mx-auto max-w-3xl space-y-6 rounded-xl p-8 shadow-xl backdrop-blur transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800/90" : "bg-white/90"
        }`}
        style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif" }}
      >
        <div className="flex justify-between items-center">
          <h1 className={`text-4xl font-bold tracking-tight ${
            isDarkMode ? "text-white" : "text-slate-800"
          }`}>My Tasks</h1>
          <div className="flex gap-3 items-center">
            <Motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDarkMode 
                  ? "bg-yellow-500 hover:bg-yellow-400 text-gray-900" 
                  : "bg-gray-800 hover:bg-gray-700 text-yellow-400"
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </Motion.button>
          <Motion.button
            onClick={logout}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(239, 68, 68, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Logout
          </Motion.button>
        </div>

        </div>

        <form onSubmit={addTask} className="flex gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className={`flex-1 border-2 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 transition-all ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-500/30"
                : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-200"
            }`}
          />
          <Motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(37, 99, 235, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Add
          </Motion.button>
        </form>

        <Motion.div layout className="space-y-3 pt-2">
          {tasks.length === 0 && (
            <p className={`text-center text-lg py-8 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              ✨ Start by adding your first task
            </p>
          )}

          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={toggleTask}
              onDelete={removeTask}
              isDarkMode={isDarkMode}
            />
          ))}
        </Motion.div>
      </Motion.div>
    </div>
  );

}
