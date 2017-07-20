"use strict";

const express = require('express');
const router  = express.Router();
const geocoder = require('geocoder');
const moment = require('moment');

module.exports = (dbHelper) => {
  router.get("/", (req, res) => {
    dbHelper.getAllEvents()
      .then((results) => {
        res.render('search', {results});
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
    //get coordinates of location
    geocoder.geocode(`${req.body.location}, Vancouver`, (err, data) => {
      const event = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        date_time: req.body.date_time,
        restriction: req.body.restriction,
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng,
      };
      // console.log(event);
      dbHelper.createEvent(event,req.session.userID)
        .then((id) => {
          const event_id = parseInt(id);
          //get all the current user's pups' ids
          dbHelper.getPupsIdsByUserId(req.session.userID).then((ids)=>{
            //run loop through pups' ids, insert each into event_pup table
            ids.forEach((pup_id) => {
              dbHelper.insertEventPups(pup_id.id, event_id).then(() => {
                //insert row into event_user table
                dbHelper.insertEventUser(event_id, req.session.userID)
                  .then(() => {
                    res.redirect(`/events/${event_id}`);
                });
              });
            });
          });
        });
    });


  }),

  router.get("/:id", (req, res) => {

    dbHelper.getEventDetailsByEventId(req.params.id)
      .then((results) => {
        const longitude = results[0].events.longitude
        const latitude = results[0].events.latitude
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=400x400&markers=color:blue%7C${latitude},${longitude}&key=AIzaSyDkfH1vIxG1NVhhTaELFJH_m6QE-LOEnGI`
        let userIDs = [];
        results.forEach((item) => {
          if(!userIDs.includes(item.event_user)){
            userIDs.push(item.event_user);
          }
        })
        dbHelper.getUserByIds(userIDs)
          .then((users) => {
            // console.log("from getUserById: ", users);
            dbHelper.getPupsByUserIds(userIDs)
              .then((pups) => {
                req.session.eventId = req.params.id;

                console.log(users);
                console.log(pups);
                const userWithPup = users.map((user)=>{
                  user.pups = [];
                  console.log(user);
                  for(let pup of pups){
                    if(pup.user_id === user.id){
                      user.pups.push(pup);
                    }
                  }
                  return user;
                });
                res.render('event_detail', {
                  events: results[0].events,
                  users: users,
                  moment: moment,
                  mapUrl,
                  error:'',
                  id: req.params.id
                });
              });
          });
      });
  });

  router.post('/:id', (req,res) => {
    console.log(req.app.locals.user)
    const user = req.app.locals.user;
    if(user) {
      console.log('query here')
    } else {
      console.log(req.params.id)
      res.redirect('/events/32')
    }
  })

  return router;
}