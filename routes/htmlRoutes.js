var db = require("../models");
const path = require("path");

module.exports = function(app) {
  // Load login page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  });

  // Render project selection page
  app.get("/user/:id", function(req, res) {
    db.Project.findAll({ where: { UserId: req.params.id } }).then(function(
      dbUserProjects
    ) {
      res.render("projectSelect", {
        //TODO - get the user name rather than the id.
        userName: req.params.id,
        projects: dbUserProjects
      });
    });
  });

  // Render active project page
  app.get("/project/:projectId", function(req, res) {
    db.Project.findOne({
      where: { id: req.params.projectId }
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
        res.render("projectDisplay", {
          //TODO - get the user name rather than the id.
          userName: "bob",
          projectName: req.params.projectId,
          projects: shortcutsToShow
        });
      });
    });
  });
};
