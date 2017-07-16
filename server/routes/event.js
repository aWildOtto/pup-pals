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

  router.get("/create", (req, res) => {
    res.render('create');
  }),

  router.post("/create", (req, res)=> {
    console.log(req.body)
  }),

  router.get("/:id", (req, res) => {
    // dbHelper.getEventDetailById(req.params.id)
    //   .then((results) => {
    //     res.render('event_detail', {results})
    //   })
    req.session.eventId = req.params.id;
    res.render('event_detail');
  });

  return router;
}