"use strict";

const express = require('express');
const router  = express.Router();
const moment = require('moment');

module.exports = (dbHelper) => {
  router.get("/owner/:id", (req, res) => {
   const eventsPromise = dbHelper.eventsForUser(req.params.id);
   const userPromise = dbHelper.getUserByIds(req.params.id);
   const pupsPromise = dbHelper.getPupsByUserIds(req.params.id);
   eventsPromise.then((results)=>{
     console.log('events', results)})
   Promise.all([eventsPromise, userPromise, pupsPromise])
     .then((result) => {
       const events = result[0];
       const person = result[1][0];
       const pups = result[2];
       res.render("owner_profile", {
         person,
         events,
         pups,
         moment,
         profileId: req.params.id
       })
     })
     .catch((errors) => {
       console.log(errors);
       res.status(404).render('404');
     });
  });

  return router;
}