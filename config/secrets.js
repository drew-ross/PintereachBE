module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES,
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS),
}