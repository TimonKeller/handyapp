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

router.post("/acceptInvite/:requestId", authenticateToken, async (req, res) => {
  try {
    const requestId = req.params.requestId; // ID of the user who sent the friend request
    const userId = req.user.userId; // ID of the user accepting the request, extracted from the token

    // Retrieve both users involved in the friend request
    const sender = await User.findById(requestId);
    const receiver = await User.findById(userId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add each other to their friends lists
    if (!sender.friends.includes(receiver._id)) {
      sender.friends.push(receiver._id);
    }
    if (!receiver.friends.includes(sender._id)) {
      receiver.friends.push(sender._id);
    }

    // Remove the friend request from their respective lists
    sender.sentRequests = sender.sentRequests.filter(
      (req) => req.toString() !== receiver._id.toString()
    );
    receiver.friendRequests = receiver.friendRequests.filter(
      (req) => req.toString() !== sender._id.toString()
    );

    await sender.save();
    await receiver.save();

    res.json({ message: "Friend request accepted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
