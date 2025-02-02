const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  ownerId: {
    type: String,
    require: true,
  },
  project_name: {
    type: String,
    require: true,
  },
  projectUseStorage: {
    type: Number,
    require: true,
    default: 0,
  },
  date: {
    type: String,
    require: true,
  },
  projectData: [
    {
      name: { type: String },
      url: { type: String },
      size: { type: Number },
      type: { type: String },
      date: { type: String },
    },
  ],
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = { Project };
