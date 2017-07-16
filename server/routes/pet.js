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

 
  return router;
}