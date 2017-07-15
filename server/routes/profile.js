"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {

  router.get("/pet/:id", (req, res) => {
    res.render("pet_profile");
  });
  router.get("/owner/:id", (req, res) => {

    dbHelper.getUserAndPupsById(req.params.id).then((results) => {
      console.log(results[0]);
    });

  });

  return router;
}