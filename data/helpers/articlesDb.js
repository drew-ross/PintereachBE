const db = require('../dbConfig');

module.exports = {
  findByUser
};

function findByUser(user_id) {
  return db('articles')
    .where({ user_id })
    .then(articles => articles)
    .catch(err => console.log(err));
}