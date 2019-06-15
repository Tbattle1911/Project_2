DROP DATABASE IF EXISTS project2db;

CREATE DATABASE project2db;

USE project2db

CREATE TABLE shortcuts(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  short_description VARCHAR(100) NOT NULL,
  link VARCHAR(90) NOT NULL

);



INSERT INTO shortcuts (title, short_description, getting_started, links) 
VALUES
 
('Javascript', 
'One of the main scripting languages supported by all browsers.',
'Put your script sections and links just before the close of the body tag.
Internal: <script>Your javascript here.</script>
External: <script src="https://code.jquery.com/jquery.js"></script>',
'http://eloquentjavascript.net/'),