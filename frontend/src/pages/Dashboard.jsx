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
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 p-6">
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white/90 backdrop-blur rounded-xl shadow-xl p-6 space-y-4"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">My Tasks</h1>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        <form onSubmit={addTask} className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 border rounded-lg p-2"
          />
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 rounded-lg"
          >
            Add
          </Motion.button>
        </form>

        <Motion.div layout className="space-y-2">
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 text-sm">
              ✨ Start by adding your first task
            </p>
          )}

          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={toggleTask}
              onDelete={removeTask}
            />
          ))}
        </Motion.div>
      </Motion.div>
    </div>
  );

}
