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
      user: process.env.PG_USER,
      password: process.env.PG_PWD,
    },
    pool: {
      min: 1,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/data/migrations",
    },
  },
};

const pgPool = new Pool(pgConfig);
const pgPoolWrapper = {
  async connect() {
    for (let nRetry = 1; ; nRetry++) {
      try {
        const client = await pgPool.connect();
        if (nRetry > 1) {
          console.info("Now successfully connected to Postgres");
        }
        return client;
      } catch (e) {
        if (e.toString().includes("ECONNREFUSED") && nRetry < 5) {
          console.info(
            "ECONNREFUSED connecting to Postgres, " +
              "maybe container is not ready yet, will retry " +
              nRetry
          );
          // Wait 1 second
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
          throw e;
        }
      }
    }
  },
};
