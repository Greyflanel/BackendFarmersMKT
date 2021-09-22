const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const restricted = require('./auth/restricted-middleware.js');

// Server instance
const server = express();

// Middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger('short'));
server.use(cookieParser());

// Routers
const productRouter = require("./products/products-router");
const authRouter = require('./auth/auth-router');
const usersRouter = require("./users/users-router");

// Router Middleware
server.use("/api", productRouter);
server.use("/api", authRouter);
server.use("/api", usersRouter);
// server.use("/api", (req, res) => {
//   const dataToSecure = {
//     dataToSecure: "This is the secret data in the cookie.",
//     name: "COOKIE"
//   };

//   res.cookie("secureCookie", JSON.stringify(dataToSecure, {expire: 360000 + Date.now()}), {
//     secure: true,
//     httpOnly: true,
//     sameSite: 'strict'
//   });

//   res.send("Hello.");
// }); 




module.exports = server;