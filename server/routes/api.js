"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {
  router.get('/events', (req, res) => {
    dbHelper.getAllEvents().then((results) => {
      res.json(results);
    })
  });

  router.get("/user", (req, res) => {
    if (req.xhr) {
      console.log(req.session)
      const user = {
        id: req.session.userID,
        username: req.session.username
      }
      res.json(user);
    } else {
      res.render('404');
    }
  });

  router.get("/attend/:id", (req, res) => {
    dbHelper.getEventUserIdByEventId(req.params.id)
      .then((results)=> {
        res.json(results);
      })
  });
  router.get("/events/radius", (req, res) => {
    dbHelper.searchEventInABox(req.query.boundalat, req.query.boundalng, req.query.boundblat, req.query.boundblng)
      .then((results) => {
        console.log(results.rows);
        res.json(results.rows);
      })
  });

  router.get('/owner/:id', (req, res) => {
    if (req.xhr) {
      dbHelper.getUserStatus(req.params.id).then((results) => {
        res.json(results);
      })
    } else {
      res.render('404');
    }
  });

  router.post("/owner/:id", (req, res) => {
    dbHelper.makeOwnerStatus(req.app.locals.user.id, req.body.text)
      .then(() => {
        res.redirect(`/owner/${req.app.locals.user.id}`)
      })
  });

  router.get("/owner/profile/:id", (req, res) => {
    if(req.xhr) {
    dbHelper.getUserByIds(req.params.id)
      .then((results) => {
        console.log(results, 'results')
        res.json(results)
      })
    } else {
      res.render('404')
    }
  })

  router.post("/owner/profile/:id", (req, res) => {
    console.log(req.body)
    dbHelper.getUserByIds(req.params.id)
      .then((results) => {
        let avatar_url = req.body.avatar_url || results[0].avatar_url;
        let name = req.body.name || results[0].name;
        dbHelper.updateOwnerProfile(req.params.id, avatar_url, name)
          .then(()=> {res.sendStatus(204)})
      })
  })

  router.get('/pet/:id', (req, res) => {
    if(req.xhr) {
      dbHelper.getPupStatuses(req.params.id).then((results) => {
        res.json(results);
      })
    } else {
      res.render('404');
    }
  });

  router.post("/pet/:id", (req, res) => {
    dbHelper.makePupStatus(req.params.id, req.body.text)
      .then((results) => {
        res.json(results)
      })
  });

  router.get("/pet/profile/:id", (req, res) => {
    // if(req.xhr) {
    console.log(req.params.id)
    dbHelper.getPupsByIds(req.params.id)
      .then((results) => {
        console.log(results, 'results')
        res.json(results)
      })
    // } else {
      // res.render('404')
    // }
  })

  router.post("/pet/profile/:id", (req, res) => {
    console.log(req.body)
    dbHelper.getPupsByIds(req.params.id)
      .then((results) => {
        let avatar_url = req.body.avatar_url || results[0].avatar_url;
        let name = req.body.name || results[0].name;
        let breed = req.body.breed || results[0]. breed;
        let size = req.body.size || results[0]. size;
        let temperament = req.body.temperament || results[0]. temperament;
        neutered,age,sex

        dbHelper.updatePupProfile(req.params.id, req.body)
          .then(()=> {res.sendStatus(204)})
      })
  })


  return router;
}

