require("dotenv").config();

const db = require("./models");

db.sequelize.sync({ force: true }).then(function() {
  db.Shortcut.create({
    title: "Javascript",
    shortDescription:
      "One of the main scripting languages supported by all browsers.",
    gettingStarted: `Put your script sections and links just before the close of the body tag.
Internal: <script>Your javascript here.</script>
External: <script src="https://code.jquery.com/jquery.js"></script>`,
    links: "http://eloquentjavascript.net/"
  });
  db.Shortcut.create({
    title: "Javascript2",
    shortDescription:
      "One of the main scripting languages supported by all browsers.",
    gettingStarted: `Put your script sections and links just before the close of the body tag.
Internal: <script>Your javascript here.</script>
External: <script src="https://code.jquery.com/jquery.js"></script>`,
    links: "http://eloquentjavascript.net/"
  });

  db.User.create({
    name: "Bob"
  }).then(function(res) {
    //We can create user Projects now.
    db.Project.create({
      title: "Project1",
      showMask: 0xffff,
      UserId: res.id
    });
    db.Project.create({
      title: "ProjectOmega",
      showMask: 0xffff,
      UserId: res.id
    });
  });

  db.User.create({
    name: "Jacob"
  }).then(function(res) {
    db.Project.create({
      title: "Project2",
      showMask: 0xffff,
      UserId: res.id
    });
  });
});
