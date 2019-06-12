module.exports = function(sequelize, Datatypes ) {

    // Creates a "User" model that matches up with DB
    const User = sequelize.define("user", {
      name: Sequelize.STRING
     
    });
    
    return User;
    
    }