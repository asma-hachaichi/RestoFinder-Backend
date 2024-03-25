const express = require("express");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const chef = require("../models/chef");
const Resto = require("../models/resto");

//Get all chef
exports.readAllChef = async function (req, res) {
  try {
    const docs = await chef.findAndCountAll({
      include: [{
        model: Resto // Include the Resto model in the query
      }]
    });

    if (docs.count === 0) {
      return res.status(204).end();
    }

    res.status(200).json({ data: docs.rows });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};



//Add chef
exports.createChef = async function (req, res) {
  try {
    const newChef = await chef.create({ ...req.body });
    res.status(201).json({ data: newChef });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//Find chef by id
exports.readChefById = async function (req, res) {
  try {
    const doc = await chef.findOne({
      where: { id: req.params.id },
    });

    if (!doc) {
      return res.status(404).json({ message:" Chef not found " }).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//Update chef
exports.updateChef = async function (req, res) {
  const foundChef = await chef.findOne({
    where: { id: req.params.id },
  });
  if (foundChef) {
    try {
      const response = chef.update(
        { ...req.body },
        {
          where: { id: req.params.id },
        },
        { new: true }
      );
      const updatedchef = await chef.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json(updatedchef);
    } catch (e) {
      console.log(e);
      res.status(401).json({ message: "Unauthorized" }).end();
    }
  } else {
    res.status(404).json({ message: "chef not found" });
  }
};

//Delete chef
exports.deleteChef = async function (req, res) {
  const foundChef = await chef.findOne({
    where: { id: req.params.id },
  });
  if (foundChef) {
    try {
      const response = chef.destroy(
        {
          where: { id: req.params.id },
        }
      );
      res.status(202).json({ message: "chef deleted successfully" });
    } catch (e) {
      console.log(e);
      res.status(401).json({ message: "Unauthorized" }).end();
    }
  } else {
    res.status(404).json({ message: "chef not found" });
  }
};