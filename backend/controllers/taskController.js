import Task from "../models/Task.js";

// @route POST /api/tasks
export const createTask = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Task title is required" });
  }

  const task = await Task.create({
    user: req.user._id,
    title,
  });

  res.status(201).json(task);
};

// @route GET /api/tasks
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

// @route PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;

  const updatedTask = await task.save();
  res.json(updatedTask);
};

// @route DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await task.deleteOne();
  res.json({ message: "Task removed" });
};
