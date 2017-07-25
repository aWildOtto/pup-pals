
exports.seed = function(knex, Promise) {
  function getPupsIdsByUserId (user_id){
      return knex('pups')
        .select('pups.id')
        .where({'pups.user_id':user_id});
    }

  function insertEvent(creator_user_id, title, description, 
    location, event_restriction, date_time, open_status, latitude, longitude){
     return knex('events').insert({// create an event under the first user's name
            creator_user_id,
            title,
            description,
            location,
            event_restriction,
            date_time,
            open_status,
            latitude,
            longitude
          }).returning('id');
  }
  function insertEventPost(user_id, event_id, content){
    return knex('event_posts').insert({
                user_id,
                event_id,
                content
              });
  }

  function insertEventUser(user_id, event_id){
    return knex('event_user').insert({
                user_id,
                event_id,
              }).then(() => {
                  return getPupsIdsByUserId(user_id)
                  .then((ids)=>{
                      return Promise.all(ids.map((pup_id)=>{
                        pup_id = Number(pup_id.id);
                        return knex('event_pup').insert({
                          event_id,
                          pup_id: pup_id
                        });
                      })
                      );
                  });
              })
  }

  return knex('events').del()
    .then(function () {
      return knex('users').select().then((users) => {//find all users
        return Promise.all([
          //-------------------first event--------------------------
          insertEvent(// create an event under the first user's name
            users[0].id,
            'Doggos Beach Party',
            'Bring your pups to the beach! All pups welcome.',
            'Sunset Beach Park',
            "No mean dogs",
            '2017-08-02T12:00',
            true,
            49.279948,
            -123.1386941
          )
          .then((id)=>{
            id = Number(id);
            return Promise.all([
              insertEventPost(//add a message to message board
                users[6].id,
                id,
                'Who wants to bring some doggo toys?'
              ),
              insertEventPost(
                users[5].id,
                id,
                'I can bring some tugging rope and water bowl.'
              ),
              insertEventUser(//add a attendent
                users[3].id,
                id
              ),
              insertEventUser(
                users[2].id,
                id
              )
            ]);
          }),
          //----------------second event--------------------
          insertEvent(
            users[4].id,
            'Small pups playdate',
            'Playdate at the dog park',
            'Burnaby Heights Off-leash Park',
            'Small Pups Only',
            '2017-08-05T12:00',
            true,
            49.288789,
            -123.017149
          )
            .then((id) => {
              id = Number(id);
              return Promise.all([
                insertEventPost(
                  users[10].id,
                  id,
                  'Looking forward to meeting you all!'
                ),
                insertEventUser(
                  users[6].id,
                  id
                ),
                insertEventUser(
                  users[8].id,
                  id
                )
            ]);
          }),

        //-----------third event----------------------
          insertEvent(
            users[9].id,
            'Mean dogs party',
            'It\'s gonna be messy and violent',
            'Pacific Spirit Regional Park',
            'Small Pups Watch out!',
            '2017-08-10T24:00' ,
            true,
            49.2577354,
            -123.123904
          )
            .then((id) => {
              id = Number(id);
              return Promise.all([
                insertEventPost(
                  users[5].id,
                  id,
                  'Oh god it\'s going to be brutal!'
                ),
                insertEventUser(
                  users[9].id,
                  id
                ),
                insertEventUser(
                  users[3].id,
                  id
                )
            ]);
        }),
        //--------------fourth event---------------------
        insertEvent(
          users[11].id,
          'National dog day',
          'Everyone love puppies!',
          '450 Beach Crescent, Vancouver, BC V6Z 3G1',
          'No restrictions, we love people and pups!',
          '2017-08-26T24:00' ,
          true,
          49.2757771,
          -123.1262836
        )
          .then((id) => {
            id = Number(id);
            return Promise.all([
              insertEventPost(
                users[5].id,
                id,
                'Loooooking forward to this so much!'
              ),
              insertEventUser(
                users[12].id,
                id
              ),
              insertEventUser(
                users[13].id,
                id
              )
          ]);
        })

      ]);//event promise array ends here
    });
  });
}