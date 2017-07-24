"use strict";

const express = require('express');
const router  = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

module.exports = (dbHelper) => {

  router.get('/login', (req, res) => {
    res.render('login', {error: null});
  });

  router.post('/login', (req, res) => {
    console.log(req.body);
    dbHelper.getUserByEmail(req.body.email)
    .then((result)=>{
      console.log(result);
      if(result.length != 0){
        if(bcrypt.compareSync(req.body.password, result[0].password)){
          // console.log(req.session);
          req.session.user = {
            id: result[0].id,
            avatar_url: result[0].avatar_url,
            username: result[0].username,
          }
          res.redirect('/');
        } else {
          res.render('login', {
            error: "Wrong Information"
          });
        }
      } else {
        res.render('login', {
            error: "Wrong information"
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.render('login', {
        error: "Unexpected turnout, report to Otto"
      });
    });
  });

  router.get("/signup", (req, res) => {
    res.render('signup', {error:null});
  });

  router.post("/signup", (req, res) => {
    dbHelper.createUser(req.body)
    .then((id)=>{
      req.session.user = {
        id: id,
        avatar_url: req.body.avatar_url,
        username: req.body.username
      }
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
      res.render('signup', {
        error: "Username or email was taken"
      })
    });
  });

  router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect('back');
  });

  return router;
}