const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already registered!");
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    console.log(error);
    next(errorHandler(500, error.message));
  }
};
const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
};
