const Sequelize = require("sequelize");

const db = require("../configuration/database.js");

const resto = db.define("resto", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nom: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pays: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ville: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  categorie: {
    type: Sequelize.STRING,
    allowNull: false,
  }
  ,
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  }
  ,
  latitude : {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  longitude : {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
});
module.exports = resto;
