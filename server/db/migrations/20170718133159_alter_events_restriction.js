
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('event_restrictions'),
    knex.schema.table('events', function(table){
      table.dropColumn('restriction');
      table.string('event_restriction');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.createTable('event_restrictions', function(table){
    table.increments('id').primary;
    table.integer('event_id').references('events.id').onDelete('CASCADE');
    table.string('description');
  }),
  knex.schema.table('events', function(table){
    table.dropColumn('event_restriction');
    table.boolean('restriction');
  })
  ]);
};
