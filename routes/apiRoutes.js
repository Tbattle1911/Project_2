var db = require("../models");

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
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  //Get a project
  app.get("/api/project/:id", function(req, res) {
    db.Shortcut.findOne({ where: { id: req.params.id }}).then(function(project) {
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
    db.Project.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
