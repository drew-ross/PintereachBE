const express = require('express');
const knex = require('knex');
const { signToken, restricted } = require('../../utils/jsonwebtoken');
const { requireInBody } = require('../../utils/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'auth' });
});

router.post('/register', restricted, requireInBody(['username', 'password']), (req, res) => {
  res.send(200);
});

module.exports = router;