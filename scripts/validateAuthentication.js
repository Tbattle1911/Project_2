const jwt = require("jsonwebtoken");
module.exports = function(user, password, token) {
  const decoded = jwt.decode(token);
  if (decoded.name === user && decoded.pass === password) {
    return true;
  }
  return false;
};
