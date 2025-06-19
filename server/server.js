require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const eventRoutes = require("./routes/event.routes");
const registrationRoutes = require("./routes/registration.routes");
const adminRoutes = require("./routes/admin.routes");

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registration", registrationRoutes);

app.get("/", (req, res) => {
  res.send("XEvents App Backend Running");
});

app.use(errorHandler);
// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("MongoDB connection error:", err));
