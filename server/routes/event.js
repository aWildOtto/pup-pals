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

  router.post("/new", (req, res, next)=> {
    if(!req.session.user){
      req.render('404');
    }
    //get coordinates of location
    geocoder.geocode(req.body.location, (err, data) => {
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
      dbHelper.createEvent(event,req.session.user.id)
        .then((id) => {
          const event_id = parseInt(id);
          //get all the current user's pups' ids
          dbHelper.getPupsIdsByUserId(req.session.user.id)
          .then((ids)=>{
            //insert row into event_user table
            dbHelper.insertEventUser(event_id, req.session.user.id)
              .then(() => {
                //run loop through pups' ids, insert each into event_pup table
                ids.forEach((pup_id) => {
                  dbHelper.insertEventPups(pup_id.id, event_id)
                  .then(() => {
                    res.redirect(`/events/${event_id}`);
                  });
                });
            });
          });
        })
        .catch((errors) => {
          console.log(errors);
          next();
        });
    });


  }),

  router.get("/:id", (req, res, next) => {

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
          if(req.session.user&& req.session.user.id===item.event_user){
            rsvped = true;
          }
        })
        dbHelper.getUserByIds(userIDs)
          .then((users) => {
            dbHelper.getPupsByUserIds(userIDs)
              .then((pups) => {
                req.session.eventId = req.params.id;
                const userWithPup = users.map((user)=>{
                  user.pups = [];
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
        next();
      });
  });
  //pass along in http

  router.post('/:id', (req, res, next) => {
    const user = req.session.user;
    if(user) {
      const user_id = user.id;
      const pupIdPromise = dbHelper.getPupsIdsByUserId(user_id);
      const userPromise = dbHelper.insertEventUser(req.params.id, user_id);
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
    if(!req.session.user){
      next();
    }
    const user_id = req.session.user.id;
    if(user_id) {
      console.log(user_id, "and shit");
      console.log(req.params.id, "and shit");
      const pupIdPromise = dbHelper.getPupsIdsByUserId(user_id);
      const userCancelPromise = dbHelper.cancelRSVP(req.params.id, user_id);
      const cancelPupPromise = pupIdPromise
        .then((pupIds) => {
          pupIds.forEach((pupId) => {
            return dbHelper.deleteEventPups(pupId.id, req.params.id);
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

  router.post('/:id/delete', (req, res, next) => {
    if(!req.session.user){
      next();
    }
    dbHelper.getEventById(req.params.id)
      .then((result) => {
        console.log(result);
        if(result[0].creator_user_id!==req.session.user.id){
          req.status(403).end("permission denied");
        }else{
          return dbHelper.closeEvent(req.params.id);
        }
      })
      .then((result) => {
        console.log(result);
        res.redirect(`/owner/${req.session.user.id}`);
      })
      ;
  });
  return router;
}