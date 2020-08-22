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
        res.status(200).json({ message: `Welcome ${username}`, token });
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
    .then(response => {
      if (response && response.user) {
        const token = signToken(response.user);
        res.status(201).json({ message: 'created new user.', username: response.user.username, token });
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

//test restricted middleware/jwt
// router.get('/', restricted, (req, res) => {
//   res.status(200).json(req.decodedToken)
// })

module.exports = router;