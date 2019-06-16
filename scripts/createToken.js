const jwt = require("jsonwebtoken");

module.exports = function(user, password) {
  //Create candidate token
  return jwt.sign({ name: user, pass: password }, process.env.JWT_KEY);
};
