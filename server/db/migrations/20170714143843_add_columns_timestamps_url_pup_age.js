
exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.table('users', function(table){
    table.string('avatar_url');
    table.timestamps(true,true);
  }),
  knex.schema.table('pups', function(table){
    table.integer('age');
    table.string('avatar_url');
    table.timestamps(true,true);
  }),
  knex.schema.table('events', function(table){
    table.timestamps(true,true);
  }),
  knex.schema.table('event_user', function(table){
    table.timestamps(true,true);
  }),
  knex.schema.table('pup_updates', function(table){
    table.timestamps(true,true);
  }),
  knex.schema.table('event_posts', function(table){
    table.string('media_url');
    table.timestamps(true,true);
  })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.table('users', function(table){
    // table.dropTimestamps();
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    table.dropColumn('avatar_url');
  }),
  knex.schema.table('pups', function(table){
    // table.dropTimestamps();
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    table.dropColumn('avatar_url');
    table.dropColumn('age');
  }),
  knex.schema.table('events', function(table){
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    // table.dropTimestamps();
  }),
  knex.schema.table('event_user', function(table){
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    // table.dropTimestamps();
  }),
  knex.schema.table('pup_updates', function(table){
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    // table.dropTimestamps();
  }),
  knex.schema.table('event_posts', function(table){
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    // table.dropTimestamps();
    table.dropColumn('media_url')
  })
  ]);
};
