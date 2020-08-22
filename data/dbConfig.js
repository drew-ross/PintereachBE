const knex = require("knex");
const knexfile = require("../knexfile.js");
const constants = require('../config/constants');

const database = constants.environment;

module.exports = knex(knexfile[database]);