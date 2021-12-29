const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../models");

// get all data
router.get("/all", async (req, res) => {
  await db.Datas.findAll().then((todos) => res.send(todos));
});

// get single data by id
router.get("/find/:id", async (req, res) => {
  await db.Datas.findAll({
    where: {
      id: req.params.id,
    },
  }).then((todo) => res.send(todo));
});

// post new data
router.post("/new", async (req, res) => {
  await db.Datas.create({
    rollno: req.body.rollno,
    Name: req.body.Name,
    DOB: req.body.DOB,
    Score: req.body.Score,
  }).then((submitedTodo) => res.send(submitedTodo));
});

// delete data
router.delete("/delete/:id", async (req, res) => {
  await db.Datas.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => res.send("success"));
});

// edit a data
router.put("/edit/:id", async (req, res) => {
  await db.Datas.update(
    {
      rollno: req.body.rollno,
      Name: req.body.Name,
      DOB: req.body.DOB,
      Score: req.body.Score,
    },
    {
      where: { id: req.params.id },
    }
  ).then(() => res.send("success"));
});

module.exports = router;
