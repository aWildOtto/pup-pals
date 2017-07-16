
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('event_restrictions').del()
    .then(function () {
      return Promise.all([
        knex('event_restrictions').insert({
          id: 1,
          event_id: 32,
          description: 'Small pups only please.'
        }),
      ]);
    });
};
