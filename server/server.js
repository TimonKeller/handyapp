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

const registerRoute = require("./routes/register"); // adjust path accordingly
app.use("/api", registerRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
