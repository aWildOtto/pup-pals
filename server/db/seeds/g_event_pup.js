
exports.seed = function(knex, Promise) {
  return knex('event_pup').del()
    .then(function () {
      return Promise.all([
        knex('event_pup').insert({
          pup_id: '4',
          event_id: '31',
        }),
        knex('event_pup').insert({
          pup_id: '2',
          event_id: '31',
        }),
        knex('event_pup').insert({
          pup_id: '3',
          event_id: '31',
        }),
        knex('event_pup').insert({
          pup_id: '5',
          event_id: '31',
        }),
        knex('event_pup').insert({
          pup_id: '1',
          event_id: '32',
        })
      ])
    });
};
