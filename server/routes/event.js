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
      res.redirect("/404");
      return;
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
          res.redirect("/500");
        });
    });
  }),

  router.get('/featured', (req, res, next) => {
    dbHelper.getEventIdByTitle()
    .then((event) => {
      console.log(event);
      res.redirect(`/events/${event[0].id}`);
    });
  }),

  router.get("/:id", (req, res, next) => {

    dbHelper.getEventDetailsByEventId(req.params.id)
      .then((results) => {
        if(results.length === 0){
          res.redirect("/404");
        }
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
        return dbHelper.getUserByIds(userIDs)
          .then((users) => {
            return dbHelper.getPupsByUserIds(userIDs)
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
        res.redirect("/500");
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
          res.redirect("/500");
        });
    } else {
      res.redirect('/user/login');
    }
  });

  router.post('/:id/cancel', (req, res, next) => {
    if(!req.session.user){
      res.redirect("/404");
      return;
    }
    const user_id = req.session.user.id;
    const pupIdPromise = dbHelper.getPupsIdsByUserId(user_id);
    const userCancelPromise = dbHelper.cancelRSVP(req.params.id, user_id);
    const cancelPupPromise = pupIdPromise
      .then((pupIds) => {
        console.log(pupIds);
        return Promise.all(pupIds.map((pupId) => {
            return dbHelper.deleteEventPups(pupId.id, req.params.id);
          })
        );
    });
    Promise.all([userCancelPromise, cancelPupPromise])
    .then((result) => {
      res.redirect('back');
    })
    .catch((error) => {
      res.redirect("/500");
    });

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
      .catch((error)=>{
        console.log(error);
        res.redirect("/500");
      });
  });

  router.post('/:id/edit', (req, res, next) => {
    console.log(req.body);
    if(!req.session.user){
      res.redirect("/404");
    }else{
    dbHelper.getEventById(req.params.id)
      .then((result) => {
        if(result[0].creator_user_id!==req.session.user.id){
          req.status(403).end("permission denied");
        }else{
          return dbHelper.getEventById(req.params.id)
            .then((result) => {
              const event = {
                title: req.body.title || result[0].title,
                description: req.body.description || result[0].description,
                restriction: req.body.restriction || result[0].restriction,
                date_time: req.body.date_time || result[0].date_time,
                location: req.body.location || result[0].location,
                longitude: req.body.location?req.body.location.geometry.location.lng: result[0].longitude,
                latitude: req.body.location?req.body.location.geometry.location.lat: result[0].latitude
              }
              return dbHelper.updateEvent(req.params.id, event);
            });
        }
      })
      .then((result) => {
        res.redirect('back');
      })
      .catch((error) =>{
        console.log(error);
        res.redirect("/500");
      });
    }
  });
  return router;
}