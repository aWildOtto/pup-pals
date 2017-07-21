"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {
  router.get('/events', (req, res) => {
    dbHelper.getAllEvents().then((results) => {
      res.json(results);
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
    console.log(req.params.id)
    dbHelper.makePupStatus(req.params.id, req.body.text)
      .then(() => {
        res.redirect(`/pet/${req.params.id}`)
      })
  })

  return router;
}

