const express = require('express');
const knex = require('knex');
const articlesDb = require('../../data/helpers/articlesDb');
const { bcryptRounds } = require('../../config/secrets');
const { restricted } = require('../../utils/jsonwebtoken');
const { requireInBody } = require('../../utils/middleware');

const router = express.Router();

router.get('/', restricted, (req, res) => {
  const user_id = req.decodedToken.subject;
  articlesDb.findByUser(user_id)
    .then(articles => res.status(200).json(articles))
    .catch(err => res.status(500).json({ message: 'There was a problem getting articles.', error: err.message }));
});

router.post('/', restricted, requireInBody(['title']), (req, res) => {
  const user_id = req.decodedToken.subject;
  const article = req.body;
  articlesDb.addByUser(user_id, article)
    .then(article => {
      res.status(201).json(article);
    })
    .catch(err => res.status(500).json({ message: 'There was a problem creating the article.', error: err.message }));
});

router.put('/:id', restricted, requireInBody([]), (req, res) => {
  const user_id = req.decodedToken.subject;
  const article = req.body;
  const id = req.params.id;
  articlesDb.updateByUser(user_id, id, article)
    .then(article => {
      if (article) {
        res.status(200).json(article);
      } else {
        res.status(404).json({ message: 'Article not found.' });
      }
    })
    .catch(err => res.status(500).json({ message: 'There was a problem updating the article.', error: err.message }));
});

router.delete('/:id', restricted, (req, res) => {
  const user_id = req.decodedToken.subject;
  const id = req.params.id;
  articlesDb.removeByUser(user_id, id)
    .then(id => {
      if (id) {
        res.status(200).json({ message: 'Deleted.', id });
      } else {
        res.status(404).json({ message: 'Article not found.' });
      }
    })
    .catch(err => res.status(500).json({ message: 'There was a problem deleting the article.', error: err.message }));
});

module.exports = router;