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

    const user = req.session.user?{
      id: req.session.user.id,
      username: req.session.user.username
    }: null;
    res.json(user);
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
    dbHelper.getUserStatus(req.params.id).then((results) => {
      res.json(results);
    })
  });

  router.post("/owner/:id", (req, res) => {
    dbHelper.makeOwnerStatus(res.locals.user.id, req.body.text)
      .then(() => {
        res.redirect(`/owner/${res.locals.user.id}`)
      })
  });

  router.get("/owner/profile/:id", (req, res) => {
    dbHelper.getUserByIds(req.params.id)
      .then((results) => {
        console.log(results, 'results')
        res.json(results)
      })
  })

  router.post("/owner/profile/:id", (req, res) => {
    console.log(req.body)
    dbHelper.getUserByIds(req.params.id)
      .then((results) => {
        let avatar_url = req.body.avatar_url || results[0].avatar_url;
        let name = req.body.name || results[0].name;
        dbHelper.updateOwnerProfile(req.params.id, avatar_url, name)
          .then(()=> {res.sendStatus(204)})
      });
  })

  router.get('/pet/:id', (req, res) => {
    dbHelper.getPupStatuses(req.params.id).then((results) => {
      res.json(results);
    })
  });

  router.post("/pet/:id", (req, res) => {
    dbHelper.makePupStatus(req.params.id, req.body)
      .then((results) => {
        res.json(results)
      })
  });

  router.get("/pet/profile/:id", (req, res) => {
    console.log(req.params.id)
    dbHelper.getPupsByIds(req.params.id)
      .then((results) => {
        console.log(results, 'results')
        res.json(results)
      });
  })

  router.post("/pet/profile/:id", (req, res) => {
    console.log(req.body)
    dbHelper.getPupsByIds(req.params.id)
      .then((results) => {
        console.log(results)
        let avatar_url = req.body.avatar_url || results[0].avatar_url;
        let name = req.body.name || results[0].name;
        let breed = req.body.breed || results[0].breed;
        let size = req.body.size || results[0].size;
        let temperament = req.body.temperament || results[0].temperament;
        let neutered = req.body.neutered || results[0].neutered;
        let age = req.body.age || results[0].age;
        let sex = req.body.sex || results[0].sex;
        const pup = {
          avatar_url,
          name,
          breed,
          size,
          temperament,
          neutered,
          age,
          sex
        }
        console.log(pup)
        dbHelper.updatePupProfile(req.params.id, pup)
          .then(()=> {res.sendStatus(204)})
      })
  })


  return router;
}

