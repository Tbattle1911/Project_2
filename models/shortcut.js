module.exports = function(sequelize, Datatypes ) {

// Creates a "Shortcut" model that matches up with DB
const Shortcut = sequelize.define("shortcut", {
  title: Sequelize.STRING,
  short_description: Sequelize.TEXT,
  getting_started: Sequelize.TEXT,
  links: Sequelize.TEXT
});

return Shortcut;

}