const bcrypt = require('bcryptjs');
const { bcryptRounds } = require('../../config/secrets');

exports.seed = function (knex) {
  return knex('users').insert([
    { id: 1, username: 'testuser1', password: bcrypt.hashSync('password', bcryptRounds) },
    { id: 2, username: 'testuser2', password: bcrypt.hashSync('password', bcryptRounds) },
  ]);
};
