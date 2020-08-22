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
    .then(id => {
      response.body = id;
      return response;
    })
    .catch(err => {
      console.log(err.code);
      response.err = err.code;
      return response;
    });
}

function findBy(column) {

}

function findAll() {

}