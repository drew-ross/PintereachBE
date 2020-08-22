const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = {
  signToken,
  restricted
};

function signToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: secrets.jwtExpires
  };
  return jwt.sign(payload, secret, options);
}

function restricted(req, res, next) {
  const token = req.headers.Authorization;
  if (token) {
    jwt.verify(token, constants.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: 'Please provide credentials.' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Please provide credentials.' });
  }
};