// routes/auth.routes.js
const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  googleLogin, // Optional
} = require("../controllers/auth.controller");

router.post("/register", signup);
router.post("/login", login);
router.post("/google-login", googleLogin);

module.exports = router;
