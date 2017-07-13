
exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.createTable('users', function(table){
    table.increments('id').primary;
    table.string('username');
    table.string('name');
    table.string('email');
    table.string('password');
    table.boolean('open_status');
    table.timestamp('created_at');
  }),
  knex.schema.createTable('pups', function(table) {
    table.increments('id').primary;
    table.integer('user_id');
    table.string('breed');
    table.string('size');
    table.string('temperament');
    table.boolean('neutered');
    table.timestamp('created_at');
  }),
  knex.schema.createTable('events', function(table) {
    table.increments('id').primary;
    table.integer('creator_user_id');
    table.string('title');
    table.string('description');
    table.string('location');
    table.timestamp('event_time');
    table.boolean('open_status');
    table.timestamp('created_at');
    table.timestamp('edited_at');
  }),
  knex.schema.createTable('event_user', function(table) {
    table.increments('id').primary;
    table.integer('event_id');
    table.integer('user_id');
    table.timestamp('created_at');
  }),
  knex.schema.createTable('event_pup', function(table) {
    table.increments('id').primary;
    table.integer('event_id');
    table.integer('pup_id');
  }),
  knex.schema.createTable('pup_updates', function(table) {
    table.increments('id').primary;
    table.integer('pup_id');
    table.string('content');
    table.timestamp('created_at');
    table.timestamp('edited_at');
  }),
  knex.schema.createTable('event_posts', function(table) {
    table.increments('id').primary;
    table.integer('user_id');
    table.integer('event_id');
    table.string('content');
    table.timestamp('created_at');
    table.timestamp('edited_at');
  })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('pups'),
    knex.schema.dropTable('events'),
    knex.schema.dropTable('event_user'),
    knex.schema.dropTable('event_pup'),
    knex.schema.dropTable('pup_updates'),
    knex.schema.dropTable('event_posts')
  ]);
};
