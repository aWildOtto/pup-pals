"use strict";

const express = require('express');
const router  = express.Router();
const moment = require('moment');

module.exports = (dbHelper) => {
  router.get("/owner/:id", (req, res) => {
    /*
    const userAndPupsPromise = dbHelper.getUserAndPupsById(req.params.id)
    const eventsPromise = dbHelper.getAllEventsOfUser(req.params.id);
    // Make a promise that returns with all the events and their attendance count
    const eventsWithAttendancePromise = eventPromise
      .then((events) => {

        // Make an array of promises, each of which has an event and its attendance
        const eventWithAttendancePromises = events.map(event => {
          // For each event, get its attendance count.
          return dbHelper.countEventAttendants(event.id)
            .then(attendants => {
              // Set the count to either the count of the first record, or 0 if the attendants is empty
              event.count = attendants.length && attendants[0].count;
              return event;
            });
        });
        // Combine the array of promises into one big promise.
        return Promise.all(eventWithAttendancePromises);
      });

    // Combine the two final promises and wait for them both to complete.
    Promise.all([userAndPupsPromise, eventsWithAttendancePromise])
      .then(results => {
        const user = results[0];
        const events = results[1];
        user.events = events;
        // Res.Render as needed.
      })
    
    */
    dbHelper.getUserAndPupsById(req.params.id).then((results) => {
      console.log(results)
      const IDs = (results,table) => {
        let arr = []
        results.forEach((item) => {
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
        allEvents.forEach((event) => {
          dbHelper.countEventAttendants(event.id)
            .then((attendants) => {
              event['count'] = attendants[0].count
              res.render("owner_profile", {
                data: results,
                eventsIDs: eventsIDs,
                pupsIDs: pupsIDs,
                profileId: req.params.id,
                allEvents: allEvents,
                moment: moment
              });
            })
        })

      })
    });
  });

  return router;
}