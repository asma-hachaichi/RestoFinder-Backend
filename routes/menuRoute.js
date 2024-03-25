const express = require("express");
const Routes = express.Router();

const controller = require("../controllers/menuController");

Routes.get("/", controller.readAllMenu);
Routes.get("/find/:id", controller.readMenuById);
Routes.post("/insert", controller.createMenu);
Routes.put("/update/:id", controller.updateMenu);
Routes.put("/delete/:id", controller.deleteMenu);

module.exports = Routes;