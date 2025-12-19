import { motion as Motion } from "framer-motion";
import { Trash2, CheckCircle } from "lucide-react";

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <Motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex items-center justify-between bg-white rounded-lg shadow p-3"
    >
      <div
        onClick={() => onToggle(task)}
        className={`flex items-center gap-2 cursor-pointer ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        <CheckCircle
          size={18}
          className={task.completed ? "text-green-500" : "text-gray-300"}
        />
        {task.title}
      </div>

      <button
        onClick={() => onDelete(task._id)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 size={18} />
      </button>
    </Motion.div>
  );
}
