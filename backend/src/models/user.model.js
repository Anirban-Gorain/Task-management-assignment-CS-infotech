const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "agent"],
    required: true,
  },

  agents: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    default: undefined,
  },

  // These following belongs to agents only

  name: {
    type: String,
  },

  contact_number: {
    type: String,
  },

  tasks: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
    default: undefined,
  },
});

const User = mongoose.model("users", UserModel);

module.exports = User;
