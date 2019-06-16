const db = require("../models");
const verify = require("../scripts/validateAuthentication");
const create = require("../scripts/createToken");

module.exports = function(app) {
  app.get("/api/shortcuts", function(req, res) {
    db.Shortcut.findAll({}).then(function(allShortcuts) {
      res.json(allShortcuts);
    });
  });

  // Create a new Shortcut - Not needed unless we have time to expand project
  app.post("/api/shortcut", function(req, res) {
    db.Shortcut.create(req.body).then(function(dbShortcut) {
      res.json(dbShortcut);
    });
  });

  // Create a new User
  app.post("/api/user", function(req, res) {
    console.log(req.body.name + " " + req.body.password);
    const newUser = {
      name: req.body.name,
      token: create(req.body.name, req.body.password)
    };

    db.User.create(newUser).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/login", function(req, res) {
    db.User.findOne({ where: { name: req.body.name } }).then(function(dbUser) {
      res.json(verify(req.body.name, req.body.password, dbUser.token));
    });
  });

  //Get a project
  app.get("/api/project/:id", function(req, res) {
    db.Shortcut.findOne({ where: { id: req.params.id } }).then(function(
      project
    ) {
      res.json(project);
    });
  });

  // Create a new Project
  app.post("/api/project", function(req, res) {
    db.Project.create(req.body).then(function(dbProject) {
      res.json(dbProject);
    });
  });

  // PUT route for updating project showables
  app.put("/api/project", function(req, res) {
    db.Project.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
