const express = require('express');
const knex = require('knex');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'auth' });
});

// router.post('/register', (req, res) => {

// })

module.exports = router;