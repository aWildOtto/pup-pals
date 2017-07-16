"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dbHelper) => {


  router.get("/pet/:id", (req, res) => {
    res.render("pet_profile");
  });

  router.get("/owner/:id", (req, res) => {

    dbHelper.getUserAndPupsById(req.params.id).then((results) => {
      console.log(results)
      const IDs = (results,table) => {
        let arr = []
        results.forEach(function(item){
          if(item[table]){
            if(arr.includes(item[table].id)){
              console.log('is in there')
            } else {
              arr.push(item[table].id)
            }
          }
        });
        return arr
      }
      const eventsIDs= IDs(results, 'events');
      const pupsIDs = IDs(results, 'pups');
      console.log(pupsIDs, eventsIDs)
      res.render("owner_profile", {
        data : results,
        eventsIDs: eventsIDs,
        pupsIDs: pupsIDs});
    });
  });

  return router;
}