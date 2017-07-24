"use strict";

const express = require('express');
const router  = express.Router();
const geocoder = require('geocoder');
const moment = require('moment');

module.exports = (dbHelper) => {
  router.get("/", (req, res) => {
    res.render('search');
  }),

  router.get("/calendar", (req, res) => {
    res.render('calendar');
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
        description: req.body.message,
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
        })
        .catch((errors) => {
          console.log(errors);
          res.status(404).render('404');
        });
    });


  }),

  router.get("/:id", (req, res) => {

    dbHelper.getEventDetailsByEventId(req.params.id)
      .then((results) => {
        const longitude = results[0].events.longitude
        const latitude = results[0].events.latitude
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=600x400&markers=color:red%7C${latitude},${longitude}&key=AIzaSyDkfH1vIxG1NVhhTaELFJH_m6QE-LOEnGI`
        let userIDs = [];
        let rsvped = false;
        results.forEach((item) => {
          if(!userIDs.includes(item.event_user)){
            userIDs.push(item.event_user);
          }
          if(req.session.userID&& req.session.userID===item.event_user){
            rsvped = true;
          }
        })
        dbHelper.getUserByIds(userIDs)
          .then((users) => {
            // console.log("from getUserById: ", users);
            dbHelper.getPupsByUserIds(userIDs)
              .then((pups) => {
                req.session.eventId = req.params.id;

                // console.log(users);
                // console.log(pups);
                const userWithPup = users.map((user)=>{
                  user.pups = [];
                  // console.log(user);
                  for(let pup of pups){
                    if(pup.user_id === user.id){
                      user.pups.push(pup);
                    }
                  }
                  return user;
                });
                console.log("rsvped is ", rsvped);
                let templateVars = {
                    events: results[0].events,
                    users: users,
                    moment: moment,
                    mapUrl,
                    id: req.params.id,
                    message:'',
                    rsvped
                  };

                res.render('event_detail', templateVars);
              });
          });
      })
      .catch((errors) => {
        console.log(errors);
        res.status(404).render('404');
      });
  });
  //pass along in http

  router.post("/rsvp", (req, res) => {
    if(!req.session){
      res.redirect('/login');
      return;
    }
        console.log("HELLO", req.session.userID, req.body.event_id);
    dbHelper.rsvpToEvent(req.session.userID, req.body.event_id)
      .then((result)=>{
        res.redirect("back");
      }
    ).catch((error) => {
      console.log(error);
    });
  });

  router.post('/:id', (req,res) => {
    const user = req.session.userID;
    if(user) {
      const userPromise = dbHelper.insertEventUser(req.body.eventId, user.id)
      const pupIdPromise = dbHelper.getPupsIdsByUserId(user.id)
      const insertPupPromise = pupIdPromise.then((pupIds) => {
        pupIds.forEach((pupId) => {
          dbHelper.insertEventPups(pupId.id, req.params.id).then(() => {
            return;
          })
        })
      });
      Promise.all([userPromise, insertPupPromise])
        .then(() => {
          res.redirect('back');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.redirect('/user/login');
    }
  });

  router.post('/:id/cancel', (req, res, next) => {
    const user_id = req.session.userID;
    if(user_id) {
      console.log(user_id, "and shit");
      console.log(req.params.id, "and shit");
      const pupIdPromise = dbHelper.getPupsIdsByUserId(user_id);
      const userCancelPromise = dbHelper.cancelRSVP(req.params.id, user_id);
      const cancelPupPromise = pupIdPromise
        .then((pupIds) => {
          pupIds.forEach((pupId) => {
            dbHelper.deleteEventPups(pupId.id, req.params.id).then(()=>{
              return;
            });
          });
      });
      Promise.all([userCancelPromise, cancelPupPromise])
      .then(() => {
        res.redirect('back');
      })
      .catch((error) => {
        console.log(error);
      });
    }else{
      res.json('cancel failed');
    }
  });
  return router;
}