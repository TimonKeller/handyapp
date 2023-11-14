const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // Import the body-parser module

const app = express();
const PORT = 3000;

// Middleware to parse the request body as JSON
app.use(bodyParser.json());

// MongoDB Verbindung
mongoose.connect("mongodb://localhost:27017/handyapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const userInfoRoute = require("./routes/userInfo");
const findFriendRoute = require("./routes/findFriend");
const friendsRequestsRoute = require("./routes/friendsRequests");
const sendInviteRoute = require("./routes/sendInvite");
const acceptInviteRoute = require("./routes/acceptInvite");
const friendsRoute = require("./routes/friends");

app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api", userInfoRoute);
app.use("/api", findFriendRoute);
app.use("/api", friendsRequestsRoute);
app.use("/api", sendInviteRoute);
app.use("/api", acceptInviteRoute);
app.use("/api", friendsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
