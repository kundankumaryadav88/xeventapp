// models/registration.model.js
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

registrationSchema.index({ event: 1, participant: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);
