
exports.seed = function(knex, Promise) {
  return knex('event_user').del()
    .then(function () {
      return Promise.all([
        knex('event_user').insert({
          user_id: '3',
          event_id: '31',
        }),
        knex('event_user').insert({
          user_id: '2',
          event_id: '31',
        }),
        knex('event_user').insert({
          user_id: '1',
          event_id: '32',
        })
      ])
    });
};
