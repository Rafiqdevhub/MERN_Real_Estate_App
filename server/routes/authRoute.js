const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  googleOAuth,
} = require("../controllers/authController");

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/sign-out", signOut);
router.post("/google", googleOAuth);

module.exports = router;
