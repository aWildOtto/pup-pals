"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {
  router.use("/pet/:id", (req, res) => {
    // req.render("pet_profile");
  });
  router.use("/owner/:id", (req, res) => {
    // req.render("owner_profile");
  });


  return router;
}