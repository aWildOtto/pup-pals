"use strict";

const express = require('express');
const router  = express.Router();
const geocoder = require('geocoder');
const moment = require('moment');

module.exports = (dbHelper) => {
  router.get("/", (req, res) => {
    res.render('search');
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
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=600x400&markers=color:blue%7C${latitude},${longitude}&key=AIzaSyDkfH1vIxG1NVhhTaELFJH_m6QE-LOEnGI`
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
                let templateVars = {
                    events: results[0].events,
                    users: users,
                    moment: moment,
                    mapUrl,
                    id: req.params.id,
                    message:''
                  };
                console.log(req.query)
                if (req.query.status == 'success') {
                  console.log(req.query.status)
                  templateVars.message = 'Successfully RSVP\'ed to event!'
                  res.render('event_detail', templateVars );
                }

                else if (req.query.status == 'error') {
                  console.log('error')
                  templateVars.message = 'Oops! You must log in before you can RSVP.'
                  res.render('event_detail', templateVars);
                }

                else {
                console.log(templateVars.message)
                res.render('event_detail', templateVars);
                }

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
        console.log('pupids',pupIds)
        pupIds.forEach((pupId) => {
          console.log(pupId.id, 'is id')
          dbHelper.insertEventPups(pupId.id, req.body.eventId).then(() => {
            return
          })
        })
      })
      Promise.all([userPromise, insertPupPromise])
        .then(() => {
          res.redirect(`/events/${req.body.eventId}/?status=success`)
        })
    } else {
      res.redirect(`/events/${req.body.eventId}/?status=error`)
    }
  })
  return router;
}