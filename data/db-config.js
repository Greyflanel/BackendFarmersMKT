const knex = require("knex");
const dbEngine = process.env.DB_ENVIRONMENT || "development"
const config = require("../knexfile.js")[dbEngine];

module.exports = knex(config);
