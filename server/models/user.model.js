// models/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["Admin", "Organizer", "Participant"],
      default: "Participant",
    },
    organizerApprovalStatus: {
      type: String,
    enum: ['pending', 'approved', 'rejected', 'not applied'],
    default: 'not applied',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

