// services/auth.service.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.signup = async ({ name, email, password, avatar }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    avatar,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    },
        token,
  };
};


exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    },
  };
};

exports.googleLogin = async ({ email, name, avatar }) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      avatar,
      password: bcrypt.hashSync(Math.random().toString(36).slice(-8), 10), // dummy password
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    },
  };
};
