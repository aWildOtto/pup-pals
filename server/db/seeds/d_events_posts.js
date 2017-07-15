
exports.seed = function(knex, Promise) {
  return knex('event_posts').del()
    .then(function () {
      return Promise.all([
        knex('event_posts').insert({
          user_id: '3',
          event_id: '31',
          content: 'Who wants to bring some doggo toys?'
        }),
        knex('event_posts').insert({
          user_id: '2',
          event_id: '31',
          content: 'I can bring some tugging rope and water bowl.'
        }),
        knex('event_posts').insert({
          user_id: '1',
          event_id: '32',
          content: 'Looking forward to meeting you all!'
        })
      ])
    });
};
