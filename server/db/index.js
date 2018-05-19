var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


var connection = mysql.createConnection({
  host: "localhost",
  user: "student",
  password: "student",
  database: "chat"
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
  //check database for user name
   //if no user name
    //add user name

  connection.query(`INSERT into users (name) VALUES ('Daryl')`, 
    function(err, rows, fields) {
      if(err) {
        console.log(err);
      } else {
        console.log('message POSTED');
      }
  });



  connection.query(`select id from users where name = 'Daryl'`, function (error, rowrs, fieldrs){
    if (error) {
      console.log(error);
    } else {
      console.log(rowrs[0].id);
    }
  });



}