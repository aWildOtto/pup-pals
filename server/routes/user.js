"use strict";

const express = require('express');
const router  = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

module.exports = (dbHelper) => {

  router.get("/login", (req, res) => {
    res.render('login');
  });

  router.post("/login", (req, res) => {
    dbHelper.getUserByEmail(req.body.email)
    .then((result)=>{
      console.log(result);
      if(result){
        if(bcrypt.compareSync(req.body.password, result[0].password)){
          req.session.username = result[0].username;
          req.session.userID = result[0].id;
          // console.log(req.session);
          req.app.locals.user = {
            username: result[0].username,
            id: result[0].id,
            avatar_url: result[0].avatar_url,
          };
          res.redirect('/');
        } else {
          res.status(403).send('Oops, looks like you entered something wrong.');
        }
      } else {
        res.status(404).send('Oops, looks like that email hasn\'t be registered');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  });

  router.get("/signup", (req, res) => {
    res.render('signup');
  });

  router.post("/signup", (req, res) => {
    let user = req.body;
    dbHelper.createUser(user)
    .then((id)=>{
      req.session.username = user.username;
      req.session.userID = id;
      user.id = id;
      req.app.locals.user = user;
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
    });
  });

  router.get("/logout", (req, res) => {
    req.session = null;
    req.app.locals.user = null;
    res.redirect('back');
  });

  return router;
}