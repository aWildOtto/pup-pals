"use strict";

const express = require('express');
const router  = express.Router();
const moment = require('moment');

module.exports = (dbHelper) => {
  router.get("/pet/new", (req, res) => {

    res.render("pet_register");
  });

  router.get("/pet/:id", (req, res) => {
    //Gget the pup's infor and info of events pup is going to
    dbHelper.getPupsAndEventsById(req.params.id).then((pup) => {
      console.log("result of getPupsAndEventsById:", pup);
      let events = [];
      //run loop through array of objects
      pup.events.forEach((event) => {
        dbHelper.countEventAttendants(event.id).then((result) => {
          console.log(result[0].count, 'is result')
          console.log('event begins',event,'event ends')
          event.count = result[0].count
          console.log('event and count', event)
          events.push(event)
        }).then(console.log(events, 'are the events'))
      })
      dbHelper.getUserByPupId(req.params.id).then((person) => {
        console.log(person)
        res.render("pet_profile", {
          person,
          pup,
          moment
        });
      });
    });
  });

  router.post("/pet/new", (req, res) => {
    console.log(req.body);
    console.log(req.session.userID);
    if(!req.session.userID) {
      res.redirect("/user/login");
      return;
    }
    dbHelper.savePet(req.body, req.session.userID).then((result) => {
      res.redirect(`/pet/${result}`);
    });
  })


  return router;
}