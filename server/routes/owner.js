"use strict";

const express = require('express');
const router  = express.Router();
const moment = require('moment');

module.exports = (dbHelper) => {
  router.get("/owner/:id", (req, res) => {

    dbHelper.getUserAndPupsById(req.params.id).then((results) => {
      console.log(results)
      const IDs = (results,table) => {
        let arr = []
        results.forEach(function(item){
          if(item[table]){
            if(!arr.includes(item[table].id)){
              arr.push(item[table].id)
            }
          }
        });
        return arr
      }
      const eventsIDs= IDs(results, 'events');
      const pupsIDs = IDs(results, 'pups');
      dbHelper.getAllEventsOfUser(req.params.id).then((allEvents) => {
        console.log(allEvents)
        res.render("owner_profile", {
          data: results,
          eventsIDs: eventsIDs,
          pupsIDs: pupsIDs,
          profileId: req.params.id,
          allEvents: allEvents,
          moment: moment
        });
      })
    });
  });

  return router;
}