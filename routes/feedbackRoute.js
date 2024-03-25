const express = require("express");
const Routes = express.Router();

const controller = require("../controllers/feedbackController");

Routes.get("/", controller.readAllFeedback);
Routes.get("/find/:id", controller.readFeedbackById);
Routes.post("/insert", controller.createFeedback);
Routes.put("/update/:id", controller.updateFeedback);
Routes.put("/delete/:id", controller.deleteFeedback);

module.exports = Routes;