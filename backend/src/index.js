require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const authenticate = require("./middleware/authenticate.js");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const authRouters = require("./routes/auth.routes.js");
app.use("/auth", authRouters);

const adminRouters = require("./routes/admin.route.js");
app.use("/admin", authenticate, adminRouters);

const agentRouters = require("./routes/agent.route.js");
app.use("/agent", authenticate, agentRouters);

module.exports = app;
