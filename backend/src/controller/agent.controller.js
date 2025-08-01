const userServices = require("../services/user.services");
const taskServices = require("../services/task.services");

async function getAllTaskOfAAgent(req, res) {
  try {
    const agentId = req.user._id;
    const tasks = await taskServices.getAllTaskOfAAgent(agentId);

    return res.status(200).send({
      tasks,
      message: "Tasks fetched successfully",
    });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
}

module.exports = { getAllTaskOfAAgent };
