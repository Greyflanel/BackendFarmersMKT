const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const restricted = require('./auth/restricted-middleware.js');

// Server instance
const server = express();

// Middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger('short'));


// Routers
const authRouter = require('./auth/auth-router');
const usersRouter = require("./users/users-router");

server.use("/", authRouter);
server.use("/", restricted, usersRouter);




module.exports = server;