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
    dbHelper.createEvent(req.body)
      .then((id) => {
        res.redirect(`/events/${id}`);
      })
  }),

  router.get("/:id", (req, res) => {

    dbHelper.getEventById(req.params.id)
      .then((results) => {
        console.log(results[0]);
        req.session.eventId = req.params.id;
        res.render('event_detail', {event: results[0]})
      })
 

  });

  return router;
}