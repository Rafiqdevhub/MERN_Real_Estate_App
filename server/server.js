const express = require("express");
require("dotenv").config();
const connectDB = require("./config/dbConnection");
const authRouter = require("./routes/authRoute");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use("/api/auth", authRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
