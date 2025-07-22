const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submissions
app.post("/register", (req, res) => {
  const { firstName, lastName, email } = req.body;
  const newUser = { firstName, lastName, email };

  const filePath = "data.json";
  let users = [];

  if (fs.existsSync(filePath)) {
    users = JSON.parse(fs.readFileSync(filePath));
  }

  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.send("✅ Registration successful!");
});

// View stored data
app.get("/get-data", (req, res) => {
  const filePath = "data.json";

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("No registrations found.");
  }

  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
