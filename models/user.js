module.exports = function(sequelize, DataTypes) {
  // Creates a "User" model that matches up with DB
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    token: DataTypes.STRING
  });

  return User;
};
