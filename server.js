const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Server instance
const server = express();

// Middleware
server.use(express.json());
server.use(cors());
server.use(helmet());


server.get("/", (req, res) => {
    res.send("Welcome to Farmer's Market ToGo")
});
server.get("/", (req, res) => {
  db("users")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get users" });
    });
});


module.exports = server;