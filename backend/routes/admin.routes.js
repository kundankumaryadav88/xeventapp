// routes/admin.routes.js
const express = require("express");
const router = express.Router();

const {
  getOrganizerRequests,
  approveOrganizer,
  rejectOrganizer,
} = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const {
  getEventRegistrations,
} = require("../controllers/registration.controller");

// Matches: GET /api/admin/organizer-requests
router.get(
  "/organizer-requests",
  authMiddleware,
  roleMiddleware("Admin"),
  getOrganizerRequests
);

// Matches: PUT /api/admin/users/:userId/approve-organizer
router.put(
  "/users/:userId/approve-organizer",
  authMiddleware,
  roleMiddleware("Admin"),
  approveOrganizer
);

// (Optional) You can also add reject route if needed:
router.put(
  "/users/:userId/reject-organizer",
  authMiddleware,
  roleMiddleware("Admin"),
  rejectOrganizer
);

router.get(
  "/events/:eventId/registrations",
  authMiddleware,
  roleMiddleware(["Admin", "Organizer"]),
  getEventRegistrations
);


module.exports = router;
