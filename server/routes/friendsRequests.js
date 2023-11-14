const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get("/friendRequests", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token

    // Find the current user and populate friend requests
    const user = await User.findById(userId)
      .populate("friendRequests", "fullName email") // Populate friend requests; adjust fields as needed
      .select("friendRequests");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ friendRequests: user.friendRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
