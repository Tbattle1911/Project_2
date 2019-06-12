module.exports = function (sequelize, DataTypes) {
  // Creates a "Project" model that matches up with DB
  const Project = sequelize.define("Project", {
    title: DataTypes.STRING,
    showMask: 
    { 
      type: DataTypes.INTEGER,
      comment: "This will be a collection of 0s and 1s which indicate if we should show a shortcut."
    }
  });

  Project.associate = function (models) {
    Project.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Project;
}