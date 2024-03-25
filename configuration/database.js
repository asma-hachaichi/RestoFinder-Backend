const Sequelize = require("sequelize");

const db = new Sequelize(
  "postgres://postgres:admin@localhost:5432/resto_app",
  {
    logging: false,

    pool: {
      idle: 60000,
    },
  }
);

module.exports = db;
