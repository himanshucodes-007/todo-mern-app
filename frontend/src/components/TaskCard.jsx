import { motion as Motion } from "framer-motion";
import { Trash2, CheckCircle } from "lucide-react";

export default function TaskCard({ task, onToggle, onDelete, isDarkMode }) {
  return (
    <Motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className={`flex items-center justify-between rounded-lg shadow-md hover:shadow-lg transition-all p-5 ${
        isDarkMode ? "bg-gray-700" : "bg-white"
      }`}
    >
      <div
        onClick={() => onToggle(task)}
        className={`flex items-center gap-3 cursor-pointer text-lg font-medium ${
          task.completed 
            ? "line-through text-gray-400" 
            : isDarkMode ? "text-gray-100" : "text-gray-700"
        }`}
      >
        <CheckCircle
          size={24}
          className={task.completed ? "text-green-500" : isDarkMode ? "text-gray-500" : "text-gray-300"}
        />
        {task.title}
      </div>

      <button
        onClick={() => onDelete(task._id)}
        className={`text-red-500 hover:text-red-600 transition-colors p-2 rounded ${
          isDarkMode ? "hover:bg-red-900/30" : "hover:bg-red-50"
        }`}
      >
        <Trash2 size={22} />
      </button>
    </Motion.div>
  );
}
