const express = require("express");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const resto = require("../models/resto");


//Get all resto
exports.readAllResto = async function (req, res) {
  try {
    const docs = await resto.findAndCountAll({});
    if (docs.count == 0) {
      return res.status(204).end();
    }
    res.status(200).json({ data: docs.rows });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};


//Add resto
exports.createResto = async function (req, res) {
  try {
    const newResto = await resto.create({ ...req.body });
    res.status(201).json({ data: newResto });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//Find resto by id
exports.readRestoById = async function (req, res) {
  try {
    const doc = await resto.findOne({
      where: { id: req.params.id },
    });

    if (!doc) {
      return res.status(404).json({ message:" Resto not found " }).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//Update resto
exports.updateResto = async function (req, res) {
  const foundResto = await resto.findOne({
    where: { id: req.params.id },
  });
  if (foundResto) {
    try {
      const response = resto.update(
        { ...req.body },
        {
          where: { id: req.params.id },
        },
        { new: true }
      );
      const updatedresto = await resto.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json(updatedresto);
    } catch (e) {
      console.log(e);
      res.status(401).json({ message: "Unauthorized" }).end();
    }
  } else {
    res.status(404).json({ message: "resto not found" });
  }
};

//Delete resto
exports.deleteResto = async function (req, res) {
  const foundResto = await resto.findOne({
    where: { id: req.params.id },
  });
  if (foundResto) {
    try {
      const response = resto.destroy(
        {
          where: { id: req.params.id },
        }
      );
      res.status(202).json({ message: "resto deleted successfully" });
    } catch (e) {
      console.log(e);
      res.status(401).json({ message: "Unauthorized" }).end();
    }
  } else {
    res.status(404).json({ message: "resto not found" });
  }
};