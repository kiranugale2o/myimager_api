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
      name: String,
      url: String,
      size: String,
    },
  ],
});

const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);

module.exports = { Project };
