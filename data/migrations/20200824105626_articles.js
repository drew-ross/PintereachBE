
exports.up = function (knex) {
  return knex.schema
    .createTable('articles', tbl => {
      tbl.increments('id');
      tbl.integer('user_id')
        .notNullable()
        .unsigned()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.string('title', 255)
        .notNullable();
      tbl.string('category', 255)
        .defaultTo('');
      tbl.string('article_url', 255)
        .defaultTo('');
      tbl.string('image_url', 255)
        .defaultTo('');
      tbl.text('summary')
        .defaultTo('');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('articles');
};
