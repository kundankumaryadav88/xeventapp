// seed.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/user.model");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const email = "crio.do.test@example.com";
  const user = await User.findOne({ email });
  if (!user) {
    await User.create({
      name: "Crio Admin",
      email,
      password: await bcrypt.hash("12345678", 10),
      role: "Admin",
      avatar: "https://picsum.photos/200",
    });
    console.log("✅ Admin user created");
  } else {
    console.log("ℹ️ Admin already exists");
  }
  mongoose.disconnect();
});
