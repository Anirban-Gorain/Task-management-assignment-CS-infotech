const express = require("express");
const router = express.Router();
const {
  createAgent,
  createTasks,
  getAllAgentsOfAdmin,
  getAllTaskOfAAgent,
} = require("../controller/admin.controller");

router.post("/create/agent", createAgent);
router.get("/agents", getAllAgentsOfAdmin);
router.get("/agents/:agentId/tasks", getAllTaskOfAAgent);
router.post("/assign/tasks", createTasks);

module.exports = router;
