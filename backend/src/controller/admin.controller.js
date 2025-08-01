const userServices = require("../services/user.services");
const taskServices = require("../services/task.services");

async function createAgent(req, res) {
  try {
    const user = req.user;
    const adminId = user._id;
    const { name, email, password, contact_number } = req.body;

    // console.log(name, email, password, contact_number);

    const createdAgent = await userServices.createAgent(
      name,
      email,
      password,
      contact_number,
      adminId
    );

    return res.status(200).send({
      agent: createdAgent,
      message: "Agent is created successfully",
    });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
}

async function getAllAgentsOfAdmin(req, res) {
  try {
    const user = req.user;
    const adminId = user._id;

    const agents = await userServices.getAllAgents(adminId);

    return res.status(200).send({
      agents,
      message: "All agents fetched successfully",
    });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
}

async function getAllTaskOfAAgent(req, res) {
  try {
    const agentId = req.params.agentId;
    const tasks = await taskServices.getAllTaskOfAAgent(agentId);

    return res.status(200).send({
      tasks,
      message: "All tasks has been fetched successfully",
    });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
}

async function createTasks(req, res) {
  try {
    const tasks = req.body.tasks;
    const adminId = req.user._id;

    const createdTasksIds = await taskServices.createTasks(tasks);
    const updatedAgents = await userServices.assignTaskToAgents(
      createdTasksIds,
      adminId
    );

    return res
      .status(200)
      .send({ updatedAgents, message: "Tasks assigned successfully" });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
}

module.exports = {
  createAgent,
  getAllAgentsOfAdmin,
  getAllTaskOfAAgent,
  createTasks,
};
