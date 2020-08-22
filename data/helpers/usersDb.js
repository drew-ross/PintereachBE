const db = require('../dbConfig');

module.exports = {
  add,
  findBy,
  findAll,
};

function add(user) {
  const response = {};
  return db('users')
    .insert(user)
    .then(async id => {
      response.user = await findBy({ id });
      return response;
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