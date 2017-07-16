
exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.table('pups', function(table){
    table.string('name');
    table.string('sex');
  })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.table('pups', function(table){
    table.dropColumn('name');
    table.dropColumn('sex');
  })
  ]);
};
