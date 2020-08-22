const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = {
  signToken,
}

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