
exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return Promise.all([
        knex('events').insert({
          id: 31,
          creator_user_id: '3',
          title: 'Doggos Beach Party',
          description: 'Bring your pups to the beach! All pups welcome.',
          location: 'Sunset Beach Park',
          date_time: '2017-08-02T12:00',
          open_status: true,
          latitude: 49.279948,
          longitude: -123.1386941
        }),
        knex('events').insert({
          id: 32,
          creator_user_id: '1',
          title: 'Small pups playdate',
          description: 'Playdate at the dog park',
          location: 'Burnaby Heights Off-leash Park',
          date_time: '2017-06-05 19:48:31.893241-07' ,
          open_status: true,
          event_restriction: 'Small Pups Only',
          latitude: 49.288789,
          longitude: -123.017149
        })
      ])
    });
};
