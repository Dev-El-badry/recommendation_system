// import './config/keys';
const keys = require("./config/keys");

export default {
  development: {
    client: "pg",
    connection: {
      host: keys.pgHost,
      database: keys.pgDatabase,
      user: keys.pgUser,
      password: keys.pgPassword,
      port: keys.pgPort,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  production: {
    client: "pg",
    connection: {
      host: keys.pgHost,
      database: keys.pgDatabase,
      user: keys.pgUser,
      password: keys.pgPassword,
      port: keys.pgPort,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
