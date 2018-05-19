CREATE DATABASE chat;

USE chat;


CREATE TABLE users (
  ID int not null auto_increment,
  primary key (ID),
  name VARCHAR(30),
  UNIQUE(name)
);

CREATE TABLE rooms (
  ID int not null auto_increment,
  primary key (ID),
  name VARCHAR(30)
);

CREATE TABLE messages (
  userID int, foreign key (userID) references users(ID),
  messages VARCHAR(140),
  roomID int, foreign key (roomID) references rooms(ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

