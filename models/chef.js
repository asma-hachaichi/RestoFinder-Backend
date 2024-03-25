const Sequelize = require("sequelize");

const db = require("../configuration/database.js");

const chef = db.define("chef", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  twitter: {
    type: Sequelize.STRING,
    allowNull: true,
  }
  ,
  instagram: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  facebook: {
    type: Sequelize.STRING,
    allowNull: true,
  }
});
module.exports = chef;
