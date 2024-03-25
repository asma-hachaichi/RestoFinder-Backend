const Sequelize = require("sequelize");

const db = require("../configuration/database.js");

const feedback = db.define("feedback", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user: {
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
});
module.exports = feedback;
