// controllers/user.controller.js
const userService = require("../services/user.service");

exports.requestOrganizerRole = async (req, res) => {
  try {
    const result = await userService.requestOrganizerRole(req.user._id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateProfile(req.user._id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getOrganizerRequests = async (req, res) => {
  try {
    const pendingUsers = await userService.getOrganizerRequests();
    res.status(200).json(pendingUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveOrganizer = async (req, res) => {
  try {
    const result = await userService.approveOrganizer(req.params.userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.rejectOrganizer = async (req, res) => {
  try {
    const result = await userService.rejectOrganizer(req.params.userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await userService.getProfile(req.user._id);
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

