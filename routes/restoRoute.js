const express = require("express");
const Routes = express.Router();

const controller = require("../controllers/restoController");

Routes.get("/", controller.readAllResto);
Routes.get("/find/:id", controller.readRestoById);
Routes.post("/insert", controller.createResto);
Routes.put("/update/:id", controller.updateResto);
Routes.put("/delete/:id", controller.deleteResto);

module.exports = Routes;