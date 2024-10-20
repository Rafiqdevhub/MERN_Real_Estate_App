const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConnection");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Home Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 404 Route
app.get("/*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
