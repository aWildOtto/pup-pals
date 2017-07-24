
exports.seed = function(knex, Promise) {
  return knex('pup_updates').del()
    .then(function () {
      return Promise.all([
        knex('pup_updates').insert({
          pup_id: '1',
          content: 'Man I just love sleeping',
        }),
        knex('pup_updates').insert({
          pup_id: '1',
          content: 'Can\'t decide if sleeping or eating is better'
        }),
        knex('pup_updates').insert({
          pup_id: '2',
          content: 'Woof Woof! Let\'s play catch?'
        }),
        knex('pup_updates').insert({
          pup_id: '1',
          content: 'Man I enjoy talking'
        }),
        knex('pup_updates').insert({
          pup_id: '3',
          content: 'WHAT IS UP EVERYONE??'
        })
      ]);
    });
};
