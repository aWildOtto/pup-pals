"use strict";

const express = require('express');
const router  = express.Router();
const moment = require('moment');

module.exports = (dbHelper) => {
  router.get("/pet/new", (req, res) => {

    res.render("pet_register");
  });

  router.get("/pet/:id", (req, res) => {
    const userPromise = dbHelper.getUserByPupId(req.params.id);
    const pupPromise = dbHelper.getPupsByIds(req.params.id);
    const eventsPromise = dbHelper.eventsForPup(req.params.id);
    Promise.all([userPromise, pupPromise, eventsPromise])
      .then((result) => {
        const person = result[0]
        const pup = result[1][0]
        const events = result[2]
        console.log(pup)
        res.render("pet_profile",  {
          person,
          pup,
          events,
          moment
        })
      })
      .catch((errors) => {
       console.log(errors);
       res.status(404).render('404');
      });
  });

  router.post("/pet/new", (req, res) => {
    console.log(req.body);
    console.log(req.session.userID);
    if(!req.session.userID) {
      res.redirect("/user/login");
      return;
    }
    dbHelper.savePet(req.body, req.session.userID)
    .then((result) => {
      res.redirect(`/pet/${result}`);
    })
    .catch((errors) => {
      console.log(errors);
      res.status(404).render('404');
    });
  })


  return router;
}