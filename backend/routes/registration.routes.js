// routes/registration.routes.js
const express = require("express");
const router = express.Router();

const {
  registerEvent,
  cancelRegistration,
  getMyRegistrations,
  isRegistered,
  getEventRegistrations,
} = require("../controllers/registration.controller");

const authMiddleware = require("../middleware/auth.middleware");
router.post("/:eventId", authMiddleware, registerEvent);
router.delete("/:eventId", authMiddleware, cancelRegistration);
router.get("/my", authMiddleware, getMyRegistrations);
router.get("/is-registered/:eventId", authMiddleware, isRegistered);
router.get("/event/:eventId", authMiddleware, getEventRegistrations);

module.exports = router;
