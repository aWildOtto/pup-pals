"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {
   router.get("/pet/new", (req, res)=>{
    res.render("pet_register");
  });

  router.get("/pet/:id", (req, res) => {
    res.render("pet_profile");
  });

  router.post("/pet/new", (req, res) => {
    console.log(req.body);
    res.redirect("/pet");//to do: insert pet profile to the database and redirect to /pet/id
  })

 
  return router;
}