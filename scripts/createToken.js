const jwt = require("jsonwebtoken");

module.exports = {
  createDataToken: function(user, password) {
    //Create candidate token
    return jwt.sign({ name: user, pass: password }, process.env.JWT_KEY);
  },
  createSessionToken: function(user) {
    return jwt.sign(
      //Two minute Session Token
      { exp: Math.floor(Date.now() / 1000) + 2 * 60, data: user },
      process.env.JWT_KEY
    );
  }
};
