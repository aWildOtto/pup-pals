"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {
  router.get('/events', (req, res) => {
    dbHelper.getAllEvents().then((results) => {
      res.json(results);
    })
  });

  router.get("/user", (req, res) => {
    res.json(req.app.locals.user);
  });

  router.get("/attend/:id", (req, res) => {
    dbHelper.getEventUserIdByEventId(req.params.id)
      .then((results)=> {
        res.json(results);
      })
  });
  router.get("/events/radius", (req, res) => {
    dbHelper.searchEventInABox(req.query.boundalat, req.query.boundalng, req.query.boundblat, req.query.boundblng)
      .then((results) => {
        console.log(results.rows);
        res.json(results.rows);
      })
  });

  router.get('/owner/:id', (req, res) => {
    dbHelper.getUserStatus(req.params.id).then((results) => {
      res.json(results);
    })
  });

  router.post("/owner/:id", (req,res) => {
    dbHelper.makeOwnerStatus(req.app.locals.user.id, req.body.text)
      .then(() => {
        res.redirect(`/owner/${req.app.locals.user.id}`)
      })
  });

  router.get('/pet/:id', (req, res) => {
    dbHelper.getPupStatuses(req.params.id).then((results) => {
      res.json(results);
    })
  });

  router.post("/pet/:id", (req, res) => {
    dbHelper.makePupStatus(req.params.id, req.body.text)
      .then(() => {
        res.redirect(`/pet/${req.params.id}`)
      })
  });

  return router;
}

