require("dotenv").config();

const db = require("./models");

db.sequelize.sync({ force: true }).then(function() {
  db.Shortcut.create({
    title: "Html",
    shortDescription:
      "Hypertext Markup Language, a system for tagging files to achieve font, color, and hyperlink effects on World Wide Web pages.  HTML (Hypertext Markup Language) is a text-based approach to expain how content within an HTML file is structured. The markup instructs a browser on displaying the text, images and other forms.",
    gettingStarted: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        
    </body>
    </html>`,
    links: "https://www.w3schools.com/html/"
  });
  db.Shortcut.create({
    title: "CSS",
    shortDescription: `CSS stands for Cascading Style Sheets. CSS describes how HTML elements are displayed.
      CSS can control the layouts of many web pages all at once.  Stylesheets are stored in CSS files.`,
    gettingStarted: `.aClassExample {
      float: right
    }
    #anIdExample {
      visibility: hidden
    }`,
    links: "https://www.w3schools.com/css/default.asp"
  });
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
    title: "Materialize",
    shortDescription:
      "Materialize is created and designed by Google, Material Design is a design language that combines the classic principles of successful design along with innovation and technology.",
    gettingStarted: `<!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>`,
    links: "https://materializecss.com/"
  });
  db.Shortcut.create({
    title: "NPM",
    shortDescription:
      "Essential JavaScript development tools that help you go to market faster and build powerful applications using modern open source code.",
    gettingStarted: `npm start
    npm run scriptName.`,
    links: "https://docs.npmjs.com/"
  });
  db.Shortcut.create({
    title: "MySql",
    shortDescription: `MySQL is a popular language for accessing and managing content in a database. It is most popular for its processing and flexibility of use.
      MySQL is a fundamental part of most  open source PHP applications.`,
    gettingStarted: "SELECT * FROM Customers WHERE CustomerID=1;",
    links: "https://www.w3schools.com/sql/default.asp"
  });
  db.Shortcut.create({
    title: "Sequelize",
    shortDescription:
      "Sequelize is a promise-based Node.js ORM for Postgres, MyMariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.",
    gettingStarted: "npm install sequelize --save.",
    links: "http://docs.sequelizejs.com/"
  });
  db.Shortcut.create({
    title: "Express",
    shortDescription:
      "Express provides a minimal interface to build our applications. It provides us the tools that are required to build our app. It is flexible as there are numerous modules available on npm, which can be directly plugged into Express.",
    gettingStarted: "$ npm install express --save.",
    links: "https://expressjs.com/"
  });
  db.Shortcut.create({
    title: "Handlebars",
    shortDescription:
      "Provides the power necessary to let you build semantic templates effectively with no frustration. Handlebars is largely compatible with Mustache templates. In most cases it is possible to swap out Mustache with Handlebars and continue using your current templates",
    gettingStarted: `<div class="entry">
    <h1>{{title}}</h1>
    <div class="body">
      {{body}}
    </div>
  </div>`,
    links: "https://handlebarsjs.com/"
  });
});
