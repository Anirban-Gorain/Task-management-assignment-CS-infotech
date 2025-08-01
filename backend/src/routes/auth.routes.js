const express = require("express");
const router = express.Router();
const {
  register,
  login,
  loginUsingToken,
} = require("../controller/auth.controller");

router.post("/signup", register);
router.post("/login", login);
router.get("/token", loginUsingToken);

module.exports = router;
