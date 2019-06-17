const jwt = require("jsonwebtoken");
module.exports = {
  validateUser: function(user, password, token) {
    const decoded = jwt.decode(token);
    if (decoded.name === user && decoded.pass === password) {
      return true;
    }
    return false;
  },
  validateSession: function(sessionToken) {
    return jwt.verify(sessionToken, process.env.JWT_KEY);
  },
  getUserFromToken: function(sessionToken) {
    return jwt.decode(sessionToken).data;
  }
};
