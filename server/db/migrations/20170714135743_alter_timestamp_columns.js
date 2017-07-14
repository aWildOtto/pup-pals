
exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.table('users', function(table){
    table.dropColumn('created_at');
  }),
  knex.schema.table('pups', function(table){
    table.dropColumn('created_at');
  }),
  knex.schema.table('events', function(table){
    table.dropColumn('created_at');
    table.dropColumn('edited_at');
  }),
  knex.schema.table('event_user', function(table){
    table.dropColumn('created_at');
  }),
  knex.schema.table('pup_updates', function(table){
    table.dropColumn('created_at');
    table.dropColumn('edited_at');
  }),
  knex.schema.table('event_posts', function(table){
    table.dropColumn('created_at');
    table.dropColumn('edited_at');
  })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.table('users', function(table){
    table.timestamp('created_at');
  }),
  knex.schema.table('pups', function(table){
    table.timestamp('created_at');
  }),
  knex.schema.table('events', function(table){
    table.timestamp('created_at');
    table.timestamp('edited_at');
  }),
  knex.schema.table('event_user', function(table){
    table.timestamp('created_at');
  }),
  knex.schema.table('pup_updates', function(table){
    table.timestamp('created_at');
    table.timestamp('edited_at');
  }),
  knex.schema.table('event_posts', function(table){
    table.timestamp('created_at');
    table.timestamp('edited_at');
  })
  ]);
};
