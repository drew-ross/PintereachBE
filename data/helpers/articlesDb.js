const db = require('../dbConfig');

module.exports = {
  findByUser,
  addByUser,
  updateByUser,
  removeByUser
};

function findByUser(user_id) {
  return db('articles')
    .where({ user_id })
    .select(['id', 'title', 'category', 'article_url', 'image_url', 'summary'])
    .then(articles => articles)
    .catch(err => console.log(err));
}

function findById(id) {
  return db('articles')
    .where({ id })
    .select(['id', 'title', 'category', 'article_url', 'image_url', 'summary'])
    .first()
    .then(article => article)
    .catch(err => console.log(err));
}

function addByUser(user_id, article) {
  const newArticle = {
    ...article,
    user_id
  };
  return db('articles')
    .insert(newArticle)
    .then(id => findById(id))
    .catch(err => console.log(err));
}

function updateByUser(user_id, id, article) {
  return db('articles')
    .where({ user_id, id })
    .update(article)
    .then(() => findById(id))
    .catch(err => console.log(err));
}

function removeByUser(user_id, id) {
  return db('articles')
    .where({ user_id, id })
    .delete()
    .then(success => {
      if (success) {
        return id;
      } else {
        return null;
      }
    })
    .catch(err => console.log(err));
}