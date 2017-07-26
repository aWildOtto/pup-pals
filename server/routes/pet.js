"use strict";

const express = require('express');
const router  = express.Router();
const moment = require('moment');

module.exports = (dbHelper) => {
  router.get("/pet/new", (req, res) => {
    res.render("pet_register");
  });


  router.post("/pet/new", (req, res) => {
    if(!req.session.user) {
      res.redirect("/user/login");
      return;
    }
    dbHelper.savePet(req.body, req.session.user.id)
    .then((result) => {
      res.redirect(`/pet/${result}`);
    })
    .catch((errors) => {
      console.log(errors);
      res.redirect('/500');
    });
  })

  router.get("/pet/:id", (req, res) => {
    const userPromise = dbHelper.getUserByPupId(req.params.id);
    const pupPromise = dbHelper.getPupsByIds(req.params.id);
    const statusPromise = dbHelper.getPupStatuses(req.params.id)
    const eventsPromise = dbHelper.eventsForPup(req.params.id);
    Promise.all([userPromise, pupPromise, eventsPromise, statusPromise])
      .then((result) => {
        if(result[1].length === 0) {
          res.redirect('/404');
        };
        const person = result[0][0];
        const pup = result[1][0];
        const events = result[2];
        const statuses = result[3];
        res.render("pet_profile",  {
          person,
          pup,
          events,
          moment,
          statuses
        })
      })
      .catch((errors) => {
       console.log(errors);
       res.redirect('/500');
      });
  });

  return router;
}