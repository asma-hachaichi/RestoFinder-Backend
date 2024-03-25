const express = require("express");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const feedback = require("../models/feedback");


//Get all feedback
exports.readAllFeedback = async function (req, res) {
  try {
    const docs = await feedback.findAndCountAll({});
    if (docs.count == 0) {
      return res.status(204).end();
    }
    res.status(200).json({ data: docs.rows });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};


//Add feedback
exports.createFeedback = async function (req, res) {
  try {
    const newFeedback = await feedback.create({ ...req.body });
    res.status(201).json({ data: newFeedback });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//Find feedback by id
exports.readFeedbackById = async function (req, res) {
  try {
    const doc = await feedback.findOne({
      where: { id: req.params.id },
    });

    if (!doc) {
      return res.status(404).json({ message:" Feedback not found " }).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//Update feedback
exports.updateFeedback = async function (req, res) {
  const foundFeedback = await feedback.findOne({
    where: { id: req.params.id },
  });
  if (foundFeedback) {
    try {
      const response = feedback.update(
        { ...req.body },
        {
          where: { id: req.params.id },
        },
        { new: true }
      );
      const updatedfeedback = await feedback.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json(updatedfeedback);
    } catch (e) {
      console.log(e);
      res.status(401).json({ message: "Unauthorized" }).end();
    }
  } else {
    res.status(404).json({ message: "feedback not found" });
  }
};

//Delete feedback
exports.deleteFeedback = async function (req, res) {
  const foundFeedback = await feedback.findOne({
    where: { id: req.params.id },
  });
  if (foundFeedback) {
    try {
      const response = feedback.destroy(
        {
          where: { id: req.params.id },
        }
      );
      res.status(202).json({ message: "feedbackdeleted successfully" });
    } catch (e) {
      console.log(e);
      res.status(401).json({ message: "Unauthorized" }).end();
    }
  } else {
    res.status(404).json({ message: "feedback not found" });
  }
};