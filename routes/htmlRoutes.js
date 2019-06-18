var db = require("../models");
const path = require("path");
const controller = require("../controllers/shortcutsController");

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
      controller.getAccountById(req.params.id).then(userResponse => {
        console.log("user: " + userResponse.name + " id: " + req.params.id);
        res.render("projectSelect", {
          userName: userResponse.name,
          userId: req.params.id,
          projects: dbUserProjects
        });
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

        controller.getAccountById(dbPrj.UserId).then(userInfo => {
          console.log(
            "id: " +
              dbPrj.UserId +
              " name: " +
              userInfo.name +
              " prjName: " +
              dbPrj.title +
              " prjId: " +
              req.params.projectId
          );
          res.render("projectDisplay", {
            userId: userInfo.id,
            userName: userInfo.name,
            projectName: dbPrj.title,
            titleId: dbPrj.id,
            shortcuts: shortcutsToShow
          });
        });
      });
    });
  });

  app.get("*", (req, res) => {
    res.render("404", {});
  });
};
