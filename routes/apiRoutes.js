const db = require("../models");
const create = require("../scripts/createToken");
const controller = require("../controllers/shortcutsController");
const verify = require("../scripts/validateAuthentication");

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
    controller
      .createAccount(req.body.name, req.body.password)
      .then(dbResponse => {
        res.json({
          success: true,
          id: dbResponse.dataValues.id,
          token: create.createSessionToken(dbResponse.dataValues.id)
        });
      })
      .catch(err => {
        res.json({
          success: false,
          message: err
        });
      });
  });

  // Log into a user account.
  app.post("/api/login", function(req, res) {
    controller
      .getAccount(req.body.name, req.body.password)
      .then(dbUser => {
        if (dbUser) {
          const success = verify.validateUser(
            req.body.name,
            req.body.password,
            dbUser.token
          );

          if (success) {
            res.json({
              success,
              id: dbUser.id,
              token: create.createSessionToken(dbUser.id)
            });
          } else {
            res.json({
              success: false,
              message: "Validation failed.  Please try again."
            });
          }
        } else {
          res.json({
            success: false,
            message: "User not found.  Do you need to sign up?"
          });
        }
      })
      .catch(err => {
        console.log(err);
        const response = {
          success: false,
          message: err
        };
        res.json(response);
      });
  });

  //Get a project - TODO - Evaluate if this is used.
  app.get("/api/project/:id", function(req, res) {
    if (verify.validateSession(req.body.token)) {
      db.Shortcut.findOne({ where: { id: req.params.id } }).then(function(
        project
      ) {
        res.json({
          success: true,
          projectId: project.id
        });
      });
    } else {
      res.json({
        success: false,
        message: "Your session has expired.  Please login again."
      });
    }
  });

  // Create a new Project
  app.post("/api/project", function(req, res) {
    if (verify.validateSession(req.body.token)) {
      console.log("Token Validated");
      const newProject = {
        title: req.body.title,
        showMask: 0xffff,
        UserId: verify.getUserIdFromToken(req.body.token)
      };

      db.Project.create(newProject).then(dbProject => {
        console.log(dbProject);
        res.json({
          success: true,
          projectId: dbProject.id
        });
      });
    } else {
      res.json({
        success: false,
        message: "Your session has expired.  Please login again."
      });
    }
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
