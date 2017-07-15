
exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.table('users', function(table){
    table.dropColumn('open_status');
    table.string('status');
  })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.table('users', function(table){
    table.dropColumn('status');
    table.boolean('open_status');
  })
  ]);
};
