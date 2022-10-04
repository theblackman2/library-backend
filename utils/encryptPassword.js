const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.encrypt = (plaintTextPassword) =>
  bcrypt.hash(plaintTextPassword, saltRounds);

module.exports.compare = (plaintTextPassword, hashedPassword) =>
  bcrypt.compare(plaintTextPassword, hashedPassword);
