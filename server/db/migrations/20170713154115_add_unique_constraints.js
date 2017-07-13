
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', function(table){
      table.unique('username', 'email')
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', function(table) {
      table.dropUnique('username', 'email')
    })
  ]);
};
