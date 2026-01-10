// routes/auth.oauth.js
const express = require("express");
const passport = require("../auth/passport");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
  setAuthCookies,
} = require("../helpers/authHelper"); // reuse helpers

const router = express.Router();

// Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const user = req.user;

    // EXACT SAME token flow as normal login
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken();

    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);

    // redirect to frontend
    res.redirect("https://ai-resume-analyzer-delta-three.vercel.app/oauth-success");
  }
);
 

// Start Facebook OAuth
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// Facebook Callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  async (req, res) => {
    const user = req.user;

    // EXACT SAME token flow as normal login
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken();

    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);

    // redirect to frontend
    res.redirect("http://localhost:5173/oauth-success");
  }
);

module.exports = router;
