"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {
  
  router.get("/", (req, res) => {
    dbHelper.getAllEvents()
      .then(() => {
        res.render('search');
      });
  })
  return router;
}