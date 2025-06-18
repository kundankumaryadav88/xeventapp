// controllers/event.controller.js
const eventService = require("../services/event.service");

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await eventService.createEvent(req.body, req.user._id);
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await eventService.updateEvent(req.params.id, req.body, req.user);
    res.status(200).json({
      message: "Event updated",
      event: updatedEvent,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deleteEvent = async (req, res) => {
  try {
    const result = await eventService.deleteEvent(req.params.id, req.user);
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const { page, limit, ...query } = req.query;
    const result = await eventService.getAllEvents(query, { page, limit });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrganizerEvents = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await eventService.getOrganizerEvents(req.user._id, { page, limit });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
