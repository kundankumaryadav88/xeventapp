// controllers/registration.controller.js
const registrationService = require("../services/registration.service");

exports.registerEvent = async (req, res) => {
  try {
    const result = await registrationService.registerEvent(req.params.eventId, req.user._id);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const result = await registrationService.cancelRegistration(req.params.eventId, req.user._id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyRegistrations = async (req, res) => {
  try {
    const result = await registrationService.getMyRegistrations(req.user._id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.isRegistered = async (req, res) => {
  try {
    const result = await registrationService.isRegistered(req.params.eventId, req.user._id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEventRegistrations = async (req, res) => {
  try {
    const result = await registrationService.getEventRegistrations(req.params.eventId, req.user);
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
