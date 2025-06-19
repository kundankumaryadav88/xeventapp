// routes/user.routes.js
const express = require("express");
const router = express.Router();

const {
  requestOrganizerRole,
  updateProfile,
  getProfile
} = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");


router.put("/request-organizer", authMiddleware, requestOrganizerRole);
router.put("/profile", authMiddleware, updateProfile);
router.get("/profile", authMiddleware, getProfile);


module.exports = router;
