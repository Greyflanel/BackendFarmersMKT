const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');

// Server instance
const server = express();

// Middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger('short'));


// Router
const usersRouter = require("./users/users-router");


server.use("/", usersRouter)




module.exports = server;