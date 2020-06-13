const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Server instance
const server = express();

// Middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// Router
const usersRouter = require("./users-router");

server.use("/", usersRouter)

server.get("/", (req, res) => {
    res.send("Welcome to Farmer's Market ToGo")
});



module.exports = server;