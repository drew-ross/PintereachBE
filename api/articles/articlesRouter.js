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

router.post('/', restricted, (req, res) => {
  res.status(200).end();
});

router.put('/:id', restricted, (req, res) => {
  res.status(200).end();
});

router.delete('/:id', restricted, (req, res) => {
  res.status(200).end();
});

module.exports = router;