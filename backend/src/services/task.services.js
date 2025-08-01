const Task = require("../models/task.model");
const User = require("../models/user.model");

async function createTasks(tasks) {
  const createdTasks = await Task.insertMany(tasks);
  const taskIds = createdTasks.map((task) => task._id);

  return taskIds;
}

async function getAllTaskOfAAgent(agentId) {
  const agent = await User.findById(agentId).populate("tasks").lean();

  return agent.tasks;
}

module.exports = { createTasks, getAllTaskOfAAgent };
