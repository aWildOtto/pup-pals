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
          event.count = result[0].count;
          events.push(event);
        });
      });
      dbHelper.getUserByPupId(req.params.id).then((person) => {
        console.log(person);
        res.render("pet_profile", {
          person,
          pup
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