"use strict";

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app  = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({
  secret: 'My socks aren not matching.'
}));

module.exports = (dbHelper) => {
  router.get("/login", (req, res) => {
    res.render('login');

  });
  router.post("/login", (req, res) => {

  });
  router.get("/signup", (req, res) => {
    res.render('signup');
  });
  router.post("/signup", (req, res) => {
    const user = req.body;
    console.log(user);
    dbHelper.createUser(user).then(()=>{
          res.redirect('/login')
      });
  })
  return router;
}