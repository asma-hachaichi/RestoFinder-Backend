const Sequelize = require("sequelize");

const db = require("../configuration/database.js");

const menu = db.define("menu", {
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
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});
module.exports = menu;
