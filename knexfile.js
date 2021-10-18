require('dotenv').config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: process.env.PG_DB,
      user: process.env.PG_USER,
      password: process.env.PG_PWD,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  staging: {
    client: "pg",
    connection: {
      database: process.env.PG_DB,
      user: process.env.PG_USER,
      password: process.env.PG_PWD,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "pg",
    connection: {
      database: process.env.DATABASE_URL,
      
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "/data/migrations",
    },
  },
};
