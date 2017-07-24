
exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.table('pup_updates', function(table){
    table.string('media_url');
  })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.table('pup_updates', function(table){
    table.dropColumn('media_url');
  })
  ]);
};
