module.exports = function (sequelize, DataTypes) {
  // Creates a "Shortcut" model that matches up with DB
  const Shortcut = sequelize.define("Shortcut", {
    title: DataTypes.STRING,
    short_description: DataTypes.TEXT,
    getting_started: DataTypes.TEXT,
    links: DataTypes.TEXT
  });

  return Shortcut;
}