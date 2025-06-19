const User = require("../models/user.model");

exports.requestOrganizerRole = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (user.role === "Organizer") {
    throw new Error("User is already an organizer");
  }

  if (user.organizerApprovalStatus === "pending") {
    throw new Error("Organizer request already submitted");
  }

  user.organizerApprovalStatus = "pending";
  await user.save();

  return {
    message: "Organizer request submitted successfully",
  };
};

exports.updateProfile = async (userId, { name, avatar }) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (name) user.name = name;
  if (avatar) user.avatar = avatar;

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    organizerApprovalStatus: user.organizerApprovalStatus,
    role: user.role,
  };
};

exports.getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    registeredEvents: [],
    createdEvents: [],
    organizerApprovalStatus: user.organizerApprovalStatus,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    __v: user.__v,
  };
};

exports.getOrganizerRequests = async () => {
  const pendingUsers = await User.find({
    organizerApprovalStatus: "pending",
    role: "Participant",
  });

  const result = pendingUsers.map((user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    registeredEvents: [],
    createdEvents: [],
    organizerApprovalStatus: user.organizerApprovalStatus,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    __v: user.__v,
  }));

  return result;
};

exports.approveOrganizer = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.role = "Organizer";
  user.organizerApprovalStatus = "approved";
  await user.save();

  return {
    message: "User approved as Organizer",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      registeredEvents: [],
      createdEvents: [],
      organizerApprovalStatus: user.organizerApprovalStatus,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v,
    },
  };
};

exports.rejectOrganizer = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.role = "Participant";
  user.organizerApprovalStatus = "rejected";
  await user.save();

  return {
    message: "Organizer request rejected",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      registeredEvents: [],
      createdEvents: [],
      organizerApprovalStatus: user.organizerApprovalStatus,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v,
    },
  };
};
