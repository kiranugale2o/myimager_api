const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true, // Assuming userId should be unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Assuming email should be unique
    match: [/.+@.+\..+/, "Please enter a valid email address"], // Optional email validation
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    default: "", // Default to an empty string if no profile picture is provided
  },
  organization_name: {
    type: String,
    required: true,
  },
});

// Create and export the model
const User = mongoose.model("User", userSchema);
module.exports = { User };
