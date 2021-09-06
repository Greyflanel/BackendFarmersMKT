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
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "email",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: { 
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "email",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
