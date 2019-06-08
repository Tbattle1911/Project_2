DROP DATABASE IF EXISTS shortcuts_db;
CREATE DATABASE shortcuts_db;
USE shortcuts_db;

CREATE TABLE shortcuts
(
    id SERIAL,
    title varchar(255) NOT NULL,
    short_description TEXT NOT NULL,
    getting_started TEXT NOT NULL,
    links TEXT NOT NULL,
    PRIMARY KEY (id)
);