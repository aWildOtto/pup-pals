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
    if (req.xhr) {
      res.json(req.app.locals.user);
    } else {
      res.render('404');
    }
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
    if (req.xhr) {
      dbHelper.getUserStatus(req.params.id).then((results) => {
        res.json(results);
      })
    } else {
      res.render('404');
    }
  });

  router.post("/owner/:id", (req, res) => {
    dbHelper.makeOwnerStatus(req.app.locals.user.id, req.body.text)
      .then(() => {
        res.redirect(`/owner/${req.app.locals.user.id}`)
      })
  });

  router.get("/owner/pic/:id", (req, res) => {


  })

  router.post("/owner/pic/:id", (req, res) => {

  })

  router.get('/pet/:id', (req, res) => {
    if(req.xhr) {
      dbHelper.getPupStatuses(req.params.id).then((results) => {
        res.json(results);
      })
    } else {
      res.render('404');
    }
  });

  router.post("/pet/:id", (req, res) => {
    dbHelper.makePupStatus(req.params.id, req.body.text)
      .then(() => {
        res.redirect(`/pet/${req.params.id}`)
      })
  });


  return router;
}

