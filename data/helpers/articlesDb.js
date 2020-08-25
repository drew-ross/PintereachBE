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
    .where('id', id)
    .select(['id', 'title', 'category', 'article_url', 'image_url', 'summary'])
    .first()
    .then(article => article)
    .catch(err => console.log(err));
}

async function addByUser(user_id, article) {
  const newArticle = {
    ...article,
    user_id
  };
  let id = 0;
  await db('articles')
    .insert(newArticle, 'id')
    .then(newId => id = newId)
    .catch(err => {
      console.log(err);
      return false;
    });
  const returningArticle = await findById(Number(id));
  return returningArticle;
}

// function addByUser(user_id, article) {
//   const newArticle = {
//     ...article,
//     user_id
//   };
//   return db('articles')
//     .insert(newArticle, 'id')
//     .then(id => findById(id))
//     .catch(err => console.log(err));
// }

function updateByUser(user_id, id, article) {
  const updatedArticle = { ...article, id };
  return db('articles')
    .where({ user_id, id })
    .update(updatedArticle)
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