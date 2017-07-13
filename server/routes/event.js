"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {
  
  router.get("/", (req, res) => {
    dbHelper.getAllEvents()
      .then((results) => {
        res.render('search', {results});
      });
  }),
  router.get("/:id", (req, res) => {
    // dbHelper.getEventDetailById(req.params.id)
    //   .then((results) => {
    //     res.render('event_detail', {results})
    //   })
  });
  
  return router;
}