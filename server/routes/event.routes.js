const express = require("express");
const router = express.Router();

const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
  getOrganizerEvents,
} = require("../controllers/event.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");


router.post("/", authMiddleware, roleMiddleware("Admin", "Organizer"), createEvent);
router.get("/organizer/get", authMiddleware, roleMiddleware("Organizer"), getOrganizerEvents);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", authMiddleware, roleMiddleware("Admin", "Organizer"), updateEvent);
router.delete("/:id", authMiddleware, roleMiddleware("Admin", "Organizer"), deleteEvent);

module.exports = router;
