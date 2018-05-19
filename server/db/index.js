var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


var connection = mysql.createConnection({
  host: "localhost",
  user: "student",
  password: "student",
  database: "chat",
  multipleStatements: true
})

connection.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log("Connected!");
  }
});

exports.messageGet = function (query){
  connection.query(`SELECT * from messages`, 
    function(err, rows, fields) {
      if(err) {
        throw err
      } else {
        console.log(rows, fields)
      }
  });

}

exports.messagePost = function (user, message, room){

  console.log(user, message, room);
  var query = `INSERT IGNORE INTO users (name) VALUES (${JSON.stringify(user)});
              INSERT IGNORE INTO rooms (name) VALUES (${JSON.stringify(room)});
              INSERT into messages (userId, messages, roomId) VALUES ((SELECT id from users where name = ${JSON.stringify(user)}),
              ${JSON.stringify(message)},(SELECT id from rooms where name = ${JSON.stringify(room)}));
              `
  connection.query(query, 
    function(err, rows, fields) {
      if(err) {
        console.log(err);
      } else {
        console.log('message POSTED');
      }
  });



}