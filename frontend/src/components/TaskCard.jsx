import { motion as Motion } from "framer-motion";

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <Motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between bg-gray-100 p-3 rounded"
    >
      <span
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
        onClick={() => onToggle(task)}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task._id)}
        className="text-red-500 text-sm"
      >
        ✕
      </button>
    </Motion.div>
  );
}
