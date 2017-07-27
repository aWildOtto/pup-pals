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
        res.json(results);
      })
  })

  router.post("/owner/profile/:id", (req, res) => {
    dbHelper.getUserByIds(req.params.id)
      .then((results) => {
        let avatar_url = req.body.avatar_url || results[0].avatar_url;
        let name = req.body.name || results[0].name;
        dbHelper.updateOwnerProfile(req.params.id, avatar_url, name)
          .then(()=> {
            req.session.user.avatar_url = avatar_url;
            req.session.user.username = name;
            res.sendStatus(204);
          })
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

  router.post("/pet/delete/status/:id", (req, res) => {
    if(!req.session.user){
      res.status(403).json("permission denied");
    }
    return dbHelper.getUserByPupId(req.body.pup_id)
      .then((owner) => {
        if(owner[0].id === req.session.user.id){
          return dbHelper.deletePupStatus(req.params.id)
            .then(() => {
              res.sendStatus(200);
          });
        } else{
          res.sendStatus(403);
        }
      });
  })

  router.get("/pet/profile/:id", (req, res) => {
    dbHelper.getPupsByIds(req.params.id)
      .then((results) => {
        res.json(results)
      });
  })

  router.post("/pet/profile/:id", (req, res) => {
    dbHelper.getPupsByIds(req.params.id)
      .then((results) => {
        const pup = {
          avatar_url: req.body.avatar_url || results[0].avatar_url,
          name: req.body.name || results[0].name,
          breed: req.body.breed || results[0].breed,
          size: req.body.size || results[0].size,
          temperament: req.body.temperament || results[0].temperament,
          neutered: req.body.neutered || results[0].neutered,
          age: req.body.age || results[0].age,
          sex: req.body.sex || results[0].sex
        }
        dbHelper.updatePupProfile(req.params.id, pup)
          .then(()=> {res.sendStatus(204)})
      })
  })

  router.post('/:id/cancel', (req, res, next) => {
    if(!req.session.user){
      res.json("you are not logged in");
      return;
    }
    const user_id = req.session.user.id;
    const pupIdPromise = dbHelper.getPupsIdsByUserId(user_id);
    const userCancelPromise = dbHelper.cancelRSVP(req.params.id, user_id);
    const cancelPupPromise = pupIdPromise
      .then((pupIds) => {
        return Promise.all(pupIds.map((pupId) => {
            return dbHelper.deleteEventPups(pupId.id, req.params.id);
          })
        );
    });
    Promise.all([userCancelPromise, cancelPupPromise])
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.json("something went wrong on our end :0");
    });

  });

  router.get('/userEvents', (req, res, next) => {
    if(!req.session.user){
      res.json('');
    }else{
      dbHelper.getEventIdsByUserId(req.session.user.id)
        .then((result) => {
          res.json(result);
      });
    }
  });

  return router;
}

