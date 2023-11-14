const express = require("express");
const router = express.Router();
const User = require("../models/user");
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

router.post("/sendInvite", authenticateToken, async (req, res) => {
  try {
    const { friendEmail } = req.body;
    const senderId = req.user.userId; // Extracted from the token

    // Check if the friend exists
    const receiver = await User.findOne({ email: friendEmail });
    if (!receiver) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Prevent inviting oneself
    if (receiver._id.toString() === senderId) {
      return res.status(400).json({ message: "You cannot invite yourself" });
    }

    // Check if already sent a request
    const sender = await User.findById(senderId);
    if (sender.sentRequests.includes(receiver._id)) {
      return res.status(400).json({ message: "Request already sent" });
    }

    // Add friend request to sender's sent requests
    sender.sentRequests.push(receiver._id);
    await sender.save();

    // Add friend request to receiver's friend requests
    receiver.friendRequests.push(sender._id);
    await receiver.save();

    // Optionally, you can implement notification logic here

    res.json({ message: "Invitation sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
