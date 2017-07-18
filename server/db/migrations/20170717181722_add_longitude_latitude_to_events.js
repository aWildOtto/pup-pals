
exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.table('events', function(table){
    table.float('longitude', 14, 10);
    table.float('latitude', 14, 10);
  })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.table('events', function(table){
    table.dropColumn('longitude');
    table.dropColumn('latitude');
  })])
};
