const db = require("../models");
const create = require("../scripts/createToken");

module.exports = {
  createAccount: (name, password) => {
    const newUser = {
      name,
      token: create.createDataToken(name, password)
    };

    return db.User.create(newUser);
  },
  getAccount: name => {
    return db.User.findOne({ where: { name: name } });
  }
};
