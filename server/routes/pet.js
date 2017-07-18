"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {
  router.get("/pet/new", (req, res) => {

    res.render("pet_register");
  });

  router.get("/pet/:id", (req, res) => {
    dbHelper.getPupsAndEventsById(req.params.id).then((result) => {
      console.log("result of getPupsAndEventsById:", result);
      res.render("pet_profile", {
        pup: result     
      });
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