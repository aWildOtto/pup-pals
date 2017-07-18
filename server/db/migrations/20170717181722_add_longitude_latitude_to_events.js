
exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.table('events', function(table){
    table.decimal('longitude');
    table.decimal('latitude');
  })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.table('events', function(table){
    table.dropColumn('longitude');
    table.dropColumn('latitude');
  })])
};
