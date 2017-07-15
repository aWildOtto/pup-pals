"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {

  router.get("/pet/:id", (req, res) => {
    res.render("pet_profile");
  });
  router.get("/owner/:id", (req, res) => {
    // dbHelper.test(req.params.id).then((results) => {
    //   console.log(results)
    // })
    dbHelper.getUserAndPupsById(req.params.id).then((results) => {
      console.log(results);
      res.render("owner_profile", {data : results});
    });

  });

  return router;
}