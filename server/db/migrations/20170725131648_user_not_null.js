
exports.up = function(knex, Promise) {
  return knex.schema
    .raw("ALTER TABLE users ALTER COLUMN username SET NOT NULL;")
    .raw("ALTER TABLE users ALTER COLUMN name SET NOT NULL;")
    .raw("ALTER TABLE users ALTER COLUMN password SET NOT NULL;")
    .raw("ALTER TABLE users ALTER COLUMN avatar_url SET NOT NULL;")
    .raw("ALTER TABLE users ALTER COLUMN email SET NOT NULL;")
};

exports.down = function(knex, Promise) {
  return knex.schema
    .raw("ALTER TABLE users ALTER COLUMN username DROP NOT NULL;")
    .raw("ALTER TABLE users ALTER COLUMN name DROP NOT NULL;")
    .raw("ALTER TABLE users ALTER COLUMN password DROP NOT NULL;")
    .raw("ALTER TABLE users ALTER COLUMN avatar_url DROP NOT NULL;")
    .raw("ALTER TABLE users ALTER COLUMN email DROP NOT NULL;")
};
