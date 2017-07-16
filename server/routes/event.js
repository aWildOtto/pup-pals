"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {

  router.get("/", (req, res) => {
    dbHelper.getAllEvents()
      .then((results) => {
        res.render('search', {results});
      });
  }),

  router.get("/create", (req, res) => {
    res.render('create');
  }),

  router.post("/create", (req, res)=> {
    console.log(req.body)
    dbHelper.createEvent(req.body,req.session.userID)
      .then((id) => {
        console.log(req.session.userID)
        res.redirect(`/events/${id}`);
      })
  }),

  router.get("/:id", (req, res) => {

    dbHelper.getEventDetailsById(req.params.id)
      .then((results) => {
        let userIDs = [];
        console.log(typeof userIDs)
        let pupIDs = [];
        results.forEach(function(item){
          if(!userIDs.includes(item.event_user)){
            userIDs.push(item.event_user);
          }
          if(!pupIDs.includes(item.event_pup)){
            pupIDs.push(item.event_pup)
          }
        })
        dbHelper.getPupsByIds(pupIDs)
          .then((pups) => {
            console.log(pups);
            dbHelper.getUserByIds(userIDs)
              .then((users) => {
                console.log(users);
                req.session.eventId = req.params.id;
                res.render('event_detail', {
                  events: results[0].events,
                  pups: pups,
                  users: users})
              })
          });
      })
  });

  return router;
}