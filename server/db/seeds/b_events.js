
exports.seed = function(knex, Promise) {
  function getPupsIdsByUserId (user_id){
      return knex('pups')
        .select('pups.id')
        .where({'pups.user_id':user_id});
    }
  return knex('events').del()
    .then(function () {
      return knex('users').select().then((users) => {//find all users
        return Promise.all([
          //-------------------first event--------------------------
          knex('events').insert({// create an event under the first user's name
            creator_user_id: users[0].id,
            title: 'Doggos Beach Party',
            description: 'Bring your pups to the beach! All pups welcome.',
            location: 'Sunset Beach Park',
            event_restriction: "No mean dogs",
            date_time: '2017-08-02T12:00',
            open_status: true,
            latitude: 49.279948,
            longitude: -123.1386941
          }).returning('id')
          .then((id)=>{
            id = Number(id);
            return Promise.all([
              knex('event_posts').insert({
                user_id: users[6].id,
                event_id: id,
                content: 'Who wants to bring some doggo toys?'
              }),
              knex('event_posts').insert({
                user_id: users[5].id,
                event_id: id,
                content: 'I can bring some tugging rope and water bowl.'
              }),
              knex('event_user').insert({
                user_id: users[3].id,
                event_id: id,
              })
                .then(() => {
                  return getPupsIdsByUserId(users[3].id)
                  .then((ids)=>{
                      return Promise.all(ids.map((pup_id)=>{
                        pup_id = Number(pup_id.id);
                        return knex('event_pup').insert({
                          event_id: id,
                          pup_id: pup_id
                        });
                      })
                      );
                  });
              })
              ,
              knex('event_user').insert({
                user_id: users[2].id,
                event_id: id,
              })
                .then(() => {
                  return getPupsIdsByUserId(users[2].id)
                  .then((ids)=>{
                      return Promise.all(ids.map((pup_id)=>{
                        pup_id = Number(pup_id.id);
                        return knex('event_pup').insert({
                          event_id: id,
                          pup_id: pup_id
                        });
                      })
                      );
                  });
                })
            ]);
          }),
          //----------------second event--------------------
          knex('events').insert({
            creator_user_id: users[4].id,
            title: 'Small pups playdate',
            description: 'Playdate at the dog park',
            location: 'Burnaby Heights Off-leash Park',
            date_time: '2017-08-05T12:00' ,
            open_status: true,
            event_restriction: 'Small Pups Only',
            latitude: 49.288789,
            longitude: -123.017149
          }).returning('id')
            .then((id) => {
              id = Number(id);
              return Promise.all([
                knex('event_posts').insert({
                  user_id: users[10].id,
                  event_id: id,
                  content: 'Looking forward to meeting you all!'
                }),
                knex('event_user').insert({
                  user_id: users[6].id,
                  event_id: id,
                })
                .then(() => {
                  return getPupsIdsByUserId(users[6].id)
                  .then((ids)=>{
                      return Promise.all(ids.map((pup_id)=>{
                        pup_id = Number(pup_id.id);
                        return knex('event_pup').insert({
                          event_id: id,
                          pup_id: pup_id
                        });
                      })
                      );
                  });
                }),
                knex('event_user').insert({
                  user_id: users[8].id,
                  event_id: id,
                })
                .then(() => {
                  return getPupsIdsByUserId(users[8].id)
                  .then((ids)=>{
                      return Promise.all(ids.map((pup_id)=>{
                        pup_id = Number(pup_id.id);
                        return knex('event_pup').insert({
                          event_id: id,
                          pup_id: pup_id
                        });
                      }));
                  });
                })
            ]);
      }),

      //-----------third event----------------------
          knex('events').insert({
            creator_user_id: users[9].id,
            title: 'Mean dogs party',
            description: 'It\'s gonna be messy and violent',
            location: 'Pacific Spirit Regional Park',
            date_time: '2017-08-10T24:00' ,
            open_status: true,
            event_restriction: 'Small Pups Watch out!',
            latitude: 49.2577354,
            longitude: -123.123904
          }).returning('id')
            .then((id) => {
              id = Number(id);
              return Promise.all([
                knex('event_posts').insert({
                  user_id: users[5].id,
                  event_id: id,
                  content: 'Oh god it\'s going to be brutal!'
                }),
                knex('event_user').insert({
                  user_id: users[9].id,
                  event_id: id,
                })
                .then(() => {
                  return getPupsIdsByUserId(users[9].id)
                  .then((ids)=>{
                      return Promise.all(ids.map((pup_id)=>{
                        pup_id = Number(pup_id.id);
                        return knex('event_pup').insert({
                          event_id: id,
                          pup_id: pup_id
                        });
                      })
                    );
                  });
                }),
                knex('event_user').insert({
                  user_id: users[3].id,
                  event_id: id,
                })
                  .then(() => {
                    return getPupsIdsByUserId(users[3].id)
                    .then((ids)=>{
                        return Promise.all(ids.map((pup_id)=>{
                          pup_id = Number(pup_id.id);
                          return knex('event_pup').insert({
                            event_id: id,
                            pup_id: pup_id
                          });
                        }));
                    });
                })
            ]);
      })

    ]);//event promise array ends here
  });
});
}