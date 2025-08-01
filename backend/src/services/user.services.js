const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function createAdmin(email, password) {
  const agents = [];

  const admin = await User.create({
    email,
    password,
    role: "admin",
    agents,
  });

  return admin;
}

async function createAgent(name, email, password, contact_number, adminId) {
  console.log(name, email, password, contact_number, adminId);
  const tasks = [];

  const agent = await User.create({
    name,
    email,
    password,
    contact_number,
    role: "agent",
    tasks,
  });

  await User.findByIdAndUpdate(adminId, {
    $push: { agents: agent._id },
  });

  return agent;
}

async function getAllAgents(adminId) {
  const admin = await User.findById(adminId).populate("agents");

  if (!admin || admin.role !== "admin") {
    throw new Error("Invalid admin ID or user is not an admin");
  }

  return admin.agents;
}

async function findUserById(userId) {
  const user = await User.findById(userId);
  return user;
}

async function findUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

async function assignTaskToAgents(tasksIds, adminId) {
  const agents = await getAllAgents(adminId);
  const totalAgents = agents.length;
  const totalTasks = tasksIds.length;

  const baseTaskPerAgent = Math.floor(totalTasks / totalAgents);
  let remainingTasks = totalTasks % totalAgents;

  let taskIndex = 0;
  let updatedAgents = [];

  for (const agent of agents) {
    let numberOfTasks = baseTaskPerAgent;

    if (remainingTasks > 0) {
      numberOfTasks += 1;
      remainingTasks -= 1;
    }

    const tasksForAgent = tasksIds.slice(taskIndex, taskIndex + numberOfTasks);

    const updatedAgent = await User.findByIdAndUpdate(
      agent._id,
      {
        $push: { tasks: { $each: tasksForAgent } },
      },
      { new: true }
    );

    updatedAgents = [...updatedAgents, updatedAgent];

    taskIndex += numberOfTasks;
  }

  return updatedAgents;
}

module.exports = {
  createAdmin,
  createAgent,
  getAllAgents,
  findUserById,
  findUserByEmail,
  assignTaskToAgents,
};
