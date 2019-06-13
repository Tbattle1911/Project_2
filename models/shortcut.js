module.exports = function(sequelize, DataTypes) {
  // Creates a "Shortcut" model that matches up with DB
  const Shortcut = sequelize.define("Shortcut", {
    title: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    gettingStarted: DataTypes.TEXT,
    links: DataTypes.TEXT
  });

  return Shortcut;
};
