const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
};
const signIn = async (req, res) => {};
const signOut = async (req, res) => {};

module.exports = {
  signUp,
  signIn,
  signOut,
};
