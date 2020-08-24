const express = require('express');
const knex = require('knex');
const articlesDb = require('../../data/helpers/articlesDb');
const { bcryptRounds } = require('../../config/secrets');
const { restricted } = require('../../utils/jsonwebtoken');
const { requireInBody } = require('../../utils/middleware');

const router = express.Router();

router.get('/', restricted, (req, res) => {
  res.status(200).end();
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