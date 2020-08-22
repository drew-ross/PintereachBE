const db = require('../dbConfig');

module.exports = {
  add,
  findBy,
  findAll,
};

function add(user) {
  const response = {};
  return db('users')
    .insert(user, 'id')
    .then(id => {
      response.id = id;
    })
    .catch(err => {
      console.log(err.code);
      response.err = err.code;
      return response;
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

function findAll() {

};