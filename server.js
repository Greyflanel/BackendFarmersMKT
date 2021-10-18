const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

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
server.use("/", productRouter);
server.use("/", authRouter);
server.use("/", usersRouter);

require("dotenv").config();

const PORT = process.env.PORT;

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

client.query(
  "SELECT table_schema,table_name FROM information_schema.tables;",
  (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  }
);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = server;