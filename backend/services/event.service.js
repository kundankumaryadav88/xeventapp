// services/event.service.js
const Event = require("../models/event.model");
const cloudinary = require("../config/cloudinary");

exports.createEvent = async (eventData, organizerId) => {
  let imageUrl = eventData.image;

  if (imageUrl && !imageUrl.startsWith("http")) {
    const uploaded = await cloudinary.uploader.upload(imageUrl, {
      folder: "xevents",
    });
    imageUrl = uploaded.secure_url;
  }

  const newEvent = await Event.create({
    ...eventData,
    image: imageUrl,
    organizer: organizerId,
  });

  return newEvent;
};

exports.updateEvent = async (eventId, updateData, user) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error("Event not found");

  const isOwner = event.organizer && event.organizer.toString() === user._id.toString();

  if (user.role !== "Admin" && !isOwner) {
    throw new Error("Unauthorized to update this event");
  }

  if (updateData.image && !updateData.image.startsWith("http")) {
    const uploaded = await cloudinary.uploader.upload(updateData.image, {
      folder: "xevents",
    });
    updateData.image = uploaded.secure_url;
  }

  Object.assign(event, updateData);
  await event.save();

  return event;
};

exports.deleteEvent = async (eventId, user) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error("Event not found");

  if (
    user.role !== "Admin" &&
    (!event.organizer || event.organizer.toString() !== user._id.toString())
  ) {
    throw new Error("Unauthorized to delete this event");
  }

  await event.remove();

  return { message: "Event deleted successfully" };
};

exports.getEventById = async (eventId) => {
  const event = await Event.findById(eventId).populate("organizer", "name avatar");
  if (!event) throw new Error("Event not found");
  return event;
};

exports.getAllEvents = async (query = {}, pagination = {}) => {
  const { search, type, location, date, category } = query;

  const filter = {};
  if (search) filter.title = { $regex: search, $options: "i" };
  if (type) filter.eventType = type;
  if (location) filter.location = location;
  if (category) filter.category = category;
  if (date) filter.startDate = { $gte: new Date(date) };

  const page = parseInt(pagination.page) || 1;
  const limit = parseInt(pagination.limit) || 10;
  const skip = (page - 1) * limit;

  const totalEvents = await Event.countDocuments(filter);
  const events = await Event.find(filter)
    .populate("organizer", "name avatar")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    events,
    page,
    totalPages: Math.ceil(totalEvents / limit),
    totalEvents,
  };
};

exports.getOrganizerEvents = async (organizerId, pagination = {}) => {
  const page = parseInt(pagination.page) || 1;
  const limit = parseInt(pagination.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = { organizer: organizerId };
  const totalEvents = await Event.countDocuments(filter);
  const events = await Event.find(filter)
    .populate("organizer", "name avatar")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    events,
    page,
    totalPages: Math.ceil(totalEvents / limit),
    totalEvents,
  };
};
