module.exports = function(sequelize, Datatypes ) {



// Creates a "Project" model that matches up with DB
const Project = sequelize.define("project", {
  title: Sequelize.STRING  
});

Project.associate = function(models){
Project.belongsTo(models.User, {
    foreignKey: {
        allowNull: false
    }
});
};

return Project;

}
