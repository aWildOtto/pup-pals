"use strict";

const express = require('express');
const router  = express.Router();
const geocoder = require('geocoder');

module.exports = (dbHelper) => {

  router.get("/", (req, res) => {
    dbHelper.getAllEvents()
      .then((results) => {
        res.render('search', {results});
        geocoder.geocode("Sunset Beach Park, Vancouver", function ( err, data ) {
          console.log(data.results[0].geometry.location)
        });
      });
  }),

  router.get("/new", (req, res) => {
    if(req.session.userID){
      res.render('event_create');
    }else{
      res.redirect('/user/login');
    }
  }),

  router.post("/new", (req, res)=> {
    // console.log(req.body)
    dbHelper.createEvent(req.body,req.session.userID)
      .then((id) => {
        // console.log(req.session.userID)
        res.redirect(`/events/${id}`);
      })
  }),

  router.get("/:id", (req, res) => {
    // console.log(req.session);
    dbHelper.getEventDetailsByEventId(req.params.id)
      .then((results) => {
        let userIDs = [];
        console.log("from getEventDetails: ", results);
        results.forEach(function(item){
          if(!userIDs.includes(item.event_user)){
            userIDs.push(item.event_user);
          }
        })
        dbHelper.getUserByIds(userIDs)
          .then((users) => {
            console.log("from getUserById: ", users);
            dbHelper.getPupsByUserIds(userIDs)
              .then((pups) => {
                console.log(pups);
                req.session.eventId = req.params.id;
                res.render('event_detail', {
                  events: results[0].events,
                  users: users,
                  pups: pups})
              })
          })
      })
  });

  return router;
}