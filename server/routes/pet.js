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
      res.redirect(`/pet/${result}`);//to do: insert pet profile to the database and redirect to /pet/id
    });
  })


  return router;
}