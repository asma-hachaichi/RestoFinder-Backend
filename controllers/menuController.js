const express = require("express");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const menu = require("../models/menu");
const Resto = require("../models/resto");


//Get all menu
exports.readAllMenu = async function (req, res) {
  try {
    const docs = await menu.findAndCountAll({
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


//Add menu
exports.createMenu = async function (req, res) {
  try {
    const newMenu = await menu.create({ ...req.body });
    res.status(201).json({ data: newMenu });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//Find menu by id
exports.readMenuById = async function (req, res) {
  try {
    const doc = await menu.findOne({
      where: { id: req.params.id },
    });

    if (!doc) {
      return res.status(404).json({ message:" Menu not found " }).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//Find menu by id
exports.readMenuByResto = async function (req, res) {
  try {
    const docs = await menu.findAndCountAll({
      where: { restoId: req.params.id },
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

//Update menu
exports.updateMenu = async function (req, res) {
  const foundMenu = await menu.findOne({
    where: { id: req.params.id },
  });
  if (foundMenu) {
    try {
      const response = menu.update(
        { ...req.body },
        {
          where: { id: req.params.id },
        },
        { new: true }
      );
      const updatedmenu = await menu.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json(updatedmenu);
    } catch (e) {
      console.log(e);
      res.status(401).json({ message: "Unauthorized" }).end();
    }
  } else {
    res.status(404).json({ message: "menu not found" });
  }
};

//Delete menu
exports.deleteMenu = async function (req, res) {
  const foundMenu = await menu.findOne({
    where: { id: req.params.id },
  });
  if (foundMenu) {
    try {
      const response = menu.destroy(
        {
          where: { id: req.params.id },
        }
      );
      res.status(202).json({ message: "menu deleted successfully" });
    } catch (e) {
      console.log(e);
      res.status(401).json({ message: "Unauthorized" }).end();
    }
  } else {
    res.status(404).json({ message: "menu not found" });
  }
};