exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', function(table){
      table.dropUnique('username', 'email');
      table.unique('username');
      table.unique('email');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', function(table) {
      table.dropUnique('email');
      table.dropUnique('username');
      table.unique('username', 'email');
    })
  ]);
};
