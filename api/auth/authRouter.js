const express = require('express');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const usersDb = require('../../data/helpers/usersDb');
const { bcryptRounds } = require('../../config/secrets');
const { signToken, restricted } = require('../../utils/jsonwebtoken');
const { requireInBody } = require('../../utils/middleware');

const router = express.Router();

router.post('/login', requireInBody(['username', 'password']), (req, res) => {
  const { username, password } = req.body;
  usersDb.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({ message: `Welcome ${username}`, username, token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(err => res.status(500).json({ message: 'There was an issue logging in.', error: err.message }));
});

router.post('/register', requireInBody(['username', 'password']), (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, bcryptRounds);
  usersDb.add({ username, password: hash })
    .then(id => {
      if (id) {
        const token = signToken({ id, username });
        res.status(201).json({ message: 'created new user.', username, token });
      } else {
        res.status(400).json({ message: 'An account with that username already exists.' });
      }
    })
    .catch(err => res.status(500).json({ message: 'There was an issue creating a user.', error: err.message }));
});

module.exports = router;