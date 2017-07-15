"use strict";

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app  = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");


app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({
  secret: 'My socks are not matching.'
}));

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
          req.session.username = result.username;
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
    const user = req.body;
    dbHelper.createUser(user)
    .then(()=>{
      req.session.username = user.username;
      res.redirect('/')
    })
    .catch((error) => {
      console.log(error);
    });
  })

  return router;
}