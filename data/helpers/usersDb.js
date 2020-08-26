const db = require('../dbConfig');

module.exports = {
  add,
  findBy,
};

function add(user) {
  const response = {};
  return db('users')
    .insert(user, 'id')
    .then(id => id[0])
    .catch(err => {
      console.log(err);
      return null;
    });
}

function findBy(column) {
  return db('users')
    .where(column)
    .first()
    .then(user => user)
    .catch(err => {
      console.log(err.code);
    });
}