var db = require("../models");

module.exports = function(app) {
  // Load login page
  app.get("/", function(req, res) {
    db.Shortcut.findAll({}).then(function(dbShortcuts) {
      res.json(dbShortcuts);
      // res.render("index", {
      //   msg: "Welcome!",
      //   examples: dbShortcuts
      // });
    });
  });

  // Load project selection page
  app.get("/user/:id", function(req, res) {
    db.Project.findAll({ where: { UserId: req.params.id } }).then(function(
      dbUserProjects
    ) {
      res.json(dbUserProjects);
      // res.render("projects", {
      //   projects: dbUserProjects
      // });
    });
  });

  // Render active project page
  app.get("/project/:id", function(req, res) {
    db.Project.findOne({
      where: { id: req.params.id }
    }).then(function(dbPrj) {
      console.log(dbPrj.showMask);
      //Use api route to get json of all our shortcuts.
      db.Shortcut.findAll({}).then(function(data) {
        let shortcutsToShow = [];
        for (let i = 0; i < data.length; i++) {
          if ((dbPrj.showMask >> i) & 0x1) {
            //Shift showMask to associated bit.  Then evaluate if it is 1 ~ true ~ show
            shortcutsToShow.push(data[i]);
          }
        }
        res.json(shortcutsToShow);
      });
    });
  });
};
