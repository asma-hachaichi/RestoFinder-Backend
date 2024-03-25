const express = require("express");
const Routes = express.Router();

const controller = require("../controllers/chefController");

Routes.get("/", controller.readAllChef);
Routes.get("/find/:id", controller.readChefById);
Routes.post("/insert", controller.createChef);
Routes.put("/update/:id", controller.updateChef);
Routes.put("/delete/:id", controller.deleteChef);

module.exports = Routes;