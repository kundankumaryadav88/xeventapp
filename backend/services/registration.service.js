// services/registration.service.js
const Event = require("../models/event.model");
const Registration = require("../models/registration.model");
const User = require("../models/user.model");

exports.registerEvent = async (eventId, userId) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error("Event not found");
  const existing = await Registration.findOne({ event: eventId, participant: userId });
  if (existing) throw new Error("User already registered for this event");
  await Registration.create({ event: eventId, participant: userId });
  event.participants.push(userId);
  await event.save();
  return { message: "Registered successfully" };
};

exports.cancelRegistration = async (eventId, userId) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error("Event not found");

  const registration = await Registration.findOneAndDelete({
    event: eventId,
    participant: userId,
  });

  if (!registration) throw new Error("User is not registered for this event");
  event.participants = event.participants.filter(
    (participant) => participant.toString() !== userId
  );
  await event.save();

  return { message: "Registration cancelled" };
};

exports.getMyRegistrations = async (userId) => {
  const registrations = await Registration.find({ participant: userId })
    .populate("event")
    .sort({ createdAt: -1 });

  return registrations;
};

exports.isRegistered = async (eventId, userId) => {
  const registration = await Registration.findOne({ event: eventId, participant: userId });
  return { isRegistered: !!registration };
};

exports.getEventRegistrations = async (eventId, user) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error("Event not found");

  const isOwner = event.organizer.toString() === user._id.toString();
  if (user.role !== "Admin" && !isOwner) {
    throw new Error("Unauthorized to view registrations for this event");
  }

  const registrations = await Registration.find({ event: eventId })
    .populate("user", "name email avatar role")
    .populate("event", "title")
    .sort({ createdAt: -1 });

  return registrations;
};

