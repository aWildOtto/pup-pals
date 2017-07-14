"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {
  router.get("/pet/:id", (req, res) => {
    // req.render("pet_profile");
  });
  router.get("/owner/:id", (req, res) => {
    res.render("owner_profile");
  });


  return router;
}