const mongoose = require("mongoose");

const TaskModel = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  notes: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("tasks", TaskModel);

module.exports = Task;
