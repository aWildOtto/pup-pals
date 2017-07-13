require('dotenv').config({silent: true})
// if (process.env.NODE_ENV !== 'production') require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      password : process.env.DB_PASSWORD,
      ssl      : process.env.DB_SSL,
      user     : process.env.DB_USER
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true',
    pool: {
      min: 1,
      max: 20
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
  }

};
