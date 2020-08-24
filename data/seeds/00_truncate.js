
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('articles').truncate()
    .then(() => {
      return knex('users').truncate();
    });
};
