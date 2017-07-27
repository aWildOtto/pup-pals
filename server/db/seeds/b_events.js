
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
    .then(()=>{
      return knex('event_posts').del()
        .then(() => {
          return knex('event_user').del();
        })
          .then(() => {
            return knex('event_pup').del();
          });
    })
    .then(function () {
      return knex('users').select()
        .then((users) => {//find all users
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
              ),
              insertEventUser(
                users[0].id,
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
            '2017-08-05T15:00',
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
                ),
                insertEventUser(
                  users[4].id,
                  id
                )
            ]);
          }),

        //-----------third event----------------------
          insertEvent(
            users[9].id,
            'Mean dogs party',
            'It\'s gonna be fun',
            'Pacific Spirit Regional Park',
            'Small Pups Watch out!',
            '2017-08-10T19:00' ,
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
                  'Oh yea it\'s going to be awesome!'
                ),
                insertEventUser(
                  users[9].id,
                  id
                ),
                insertEventUser(
                  users[3].id,
                  id
                ),
                insertEventUser(
                  users[9].id,
                  id
                )
            ]);
        }),
        //--------------fourth event---------------------
        insertEvent(
          users[11].id,
          'National dog day',
          'Join the dog community in celebrating our best friends on National Dog Day. Whether you’re a past, present or future owner of a pup, come out and enjoy some grillables and play with the pups!',
          '999 Charleson Street, Vancouver, BC V5Z 4A2',
          'No restrictions, we love people and pups!',
          '2017-08-26T18:30' ,
          true,
          49.2666094,
          -123.1281372,17
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
              ),
              insertEventUser(
                users[11].id,
                id
              )
          ]);
        }),
        //--------------fifth event---------------------
        insertEvent(
          users[0].id,
          'Louie\'s 2nd birthday',
          'Come out to Steveston this Saturday to help Louie celebrate his second birthday! There will be treats for the pups and pizza for the humans. Instead of bringing Louie a gift, please bring some toys to donate to the SPCA! Hope to see you there!',
          'Garry Point Park',
          'No restrictions',
          '2017-10-01T12:30' ,
          true,
          49.126394,
          -123.192098
        )
          .then((id) => {
            id = Number(id);
            return Promise.all([
              insertEventPost(
                users[4].id,
                id,
                'Can\'t Wait!'
              ),
              insertEventPost(
                users[4].id,
                id,
                'Will bring lots of toys!'
              ),
              insertEventPost(
                users[5].id,
                id,
                'Sounds like an awesome event!'
              ),
              insertEventPost(
                users[6].id,
                id,
                'I can bring some food!'
              ),
              insertEventPost(
                users[7].id,
                id,
                'Are there any good dog groomers around the area?'
              ),
              insertEventPost(
                users[8].id,
                id,
                'How do I get there?'
              ),
              insertEventPost(
                users[3].id,
                id,
                'Use the map..'
              ),
              insertEventUser(
                users[2].id,
                id
              ),
              insertEventUser(
                users[3].id,
                id
              ),
              insertEventUser(
                users[4].id,
                id
              )
          ]);
        }),
        //--------------sixth event---------------------
        insertEvent(
          users[6].id,
          'Goldie meet up',
          'Calling all golden retrievers to Marlven Off-Leash Dog Park in Burnaby! New to the city and would love to meet up with some other goldie lovers! Feel free to bring balls or frisbees for the dogs to play, looking forward to meeting you all.',
          'Malvern Off-Leash Dog Park',
          'Only golden retrievers',
          '2017-09-12T10:00' ,
          true,
          49.228208,
          -122.952651
        )
          .then((id) => {
            id = Number(id);
            return Promise.all([
              insertEventUser(
                users[3].id,
                id
              ),
              insertEventUser(
                users[6].id,
                id
              ),
              insertEventUser(
                users[1].id,
                id
              )
          ]);
        }),
        //--------------seventh event---------------------
        insertEvent(
          users[3].id,
          'Small dogs unite',
          'If you would love for your small pup to play and interact with other small pups, come out to Dogwood Park in white rock! We will be meeting by the fountains and going for a walk along the trails, and having some treats in the park afterwards.',
          'Dogwood Park',
          'Only small dogs',
          '2017-09-20T11:30' ,
          true,
          49.038584,
          -122.850112
        )
          .then((id) => {
            id = Number(id);
            return Promise.all([
              insertEventUser(
                users[7].id,
                id
              ),
              insertEventUser(
                users[6].id,
                id
              ),
              insertEventUser(
                users[5].id,
                id
              ),
              insertEventUser(
                users[3].id,
                id
              )
          ]);
        }),
        //--------------eighth event---------------------
        insertEvent(
          users[10].id,
          'Barkopedia',
          'Every type of dog you can think of! This event is open for big, small, pups of all ages. There will be a big open area that the dogs can run and play around in. Excited to see you all there.',
          'Freedom Dog park',
          'No restrictions',
          '2017-10-10T13:00' ,
          true,
          49.155498,
          -122.795104
        )
          .then((id) => {
            id = Number(id);
            return Promise.all([
              insertEventUser(
                users[9].id,
                id
              ),
              insertEventUser(
                users[8].id,
                id
              ),
              insertEventUser(
                users[7].id,
                id
              ),
              insertEventUser(
                users[10].id,
                id
              )
          ]);
        }),
        //--------------ninth event---------------------
        insertEvent(
          users[11].id,
          'The Running paws',
          'Looking to meet up with other owners and pups to go running along the seawall with! The first meetup will be this Sunday at noon, meeting by Second Beach Pool in Stanley park. Hoping to make this a weekly event, can’t wait to see the turnout!',
          'Second Beach Pool',
          'No restrictions',
          '2017-07-30T10:00' ,
          true,
          49.295304,
          -123.151508
        )
          .then((id) => {
            id = Number(id);
            return Promise.all([
              insertEventUser(
                users[3].id,
                id
              ),
              insertEventUser(
                users[8].id,
                id
              ),
              insertEventUser(
                users[2].id,
                id
              ),
              insertEventUser(
                users[11].id,
                id
              )
          ]);
        }),
        //--------------tenth event---------------------
        insertEvent(
          users[13].id,
          'Barkwatch',
          'Baywatch – puppy style! This event is open for all pups. If you and your pup love the ocean and the sand then this is the meet up for you!! We hope to have games of Frisbee and catch going on so please respond if you are able to bring a toy!',
          'Kitsilano Beach Park',
          'No restrictions',
          '2017-07-30T15:00' ,
          true,
          49.273977,
          -123.154581
        )
          .then((id) => {
            id = Number(id);
            return Promise.all([
              insertEventUser(
                users[14].id,
                id
              ),
              insertEventUser(
                users[4].id,
                id
              ),
              insertEventUser(
                users[9].id,
                id
              ),
              insertEventUser(
                users[13].id,
                id
              )
          ]);
        }),
      ]);//event promise array ends here
    });
  });
}