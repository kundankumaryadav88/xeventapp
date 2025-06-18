// controllers/auth.controller.js
const authService = require("../services/auth.service");

exports.signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json(
      user
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body);
    res.status(200).json({  user,token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { token, user } = await authService.googleLogin(req.body);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
