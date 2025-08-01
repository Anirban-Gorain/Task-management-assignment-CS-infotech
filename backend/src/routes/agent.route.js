const express = require("express");
const router = express.Router();
const { getAllTaskOfAAgent } = require("../controller/agent.controller");

router.get("/tasks", getAllTaskOfAAgent);

module.exports = router;
