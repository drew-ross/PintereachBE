const express = require('express');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const usersDb = require('../../data/helpers/usersDb');
const { bcryptRounds } = require('../../config/secrets');
const { signToken, restricted } = require('../../utils/jsonwebtoken');
const { requireInBody } = require('../../utils/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'auth' });
});

router.post('/register', requireInBody(['username', 'password']), (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, bcryptRounds);
  usersDb.add({ username, password: hash })
    .then(response => {
      if (response && response.body) {
        res.status(201).json(response.body);
      } else if (response && response.err) {
        if (response.err === 'SQLITE_CONSTRAINT') {
          res.status(400).json({ message: 'An account with that username already exists', error: response.err });
        } else {
          res.status(500).json({ message: 'There was an issue creating a user.', error: response.err });
        }
      }
    })
    .catch(err => res.status(500).json({ message: 'There was an issue creating a user.', error: err.message }));
});

module.exports = router;