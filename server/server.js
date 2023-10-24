const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// MongoDB Verbindung
mongoose.connect("mongodb://localhost:27017/handyapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const User = require("./models/user"); // Assuming you have a User model as previously discussed

const newUser = new User({
  username: "john_doe",
  password: "securepassword123", // Remember to hash before saving in a real application!
  email: "john@example.com",
});

newUser
  .save()
  .then(() => console.log("User saved!"))
  .catch((err) => console.error(err));
