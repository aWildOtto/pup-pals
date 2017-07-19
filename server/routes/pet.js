"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {
  router.get("/pet/new", (req, res) => {

    res.render("pet_register");
  });

  router.get("/pet/:id", (req, res) => {
    dbHelper.getPupsAndEventsById(req.params.id).then((pup) => {
      console.log("result of getPupsAndEventsById:", pup);
      let events = [];
      pup.events.forEach((event) => {
        dbHelper.countEventAttendants(event.id).then((result) => {
          console.log(result[0].count, 'is result')
          console.log('event begins',event,'event ends')
          event.count = result[0].count
          console.log('event and count', event)
          events.push(event)
        })
      })
      console.log(events)
      dbHelper.getUserByPupId(req.params.id).then((user) => {
        console.log(user)
        res.render("pet_profile", {
          user: user,
          pup: pup
        });
      })
    })
  });

  router.post("/pet/new", (req, res) => {
    console.log(req.body);
    console.log(req.session.user_id);
    if(!req.session.user_id) {
      res.redirect("/user/login");
      return;
    }

    dbHelper.savePet(req.body, req.session.user_id).then((result) => {
      res.redirect(`/pet/${result}`);
    });
  })


  return router;
}