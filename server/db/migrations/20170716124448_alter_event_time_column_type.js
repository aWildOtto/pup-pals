
exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.alterTable('events', function(table){
    table.dropColumn('event_time');
    table.dateTime('date_time');
  })])
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.alterTable('events', function(table){
    table.dropColumn('date_time');
    table.timestamp('event_time');
  })])
};
