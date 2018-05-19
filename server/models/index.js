var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      db.messageGet(req, res);
    }, // a function which produces all the messages
    post: function (req, res) {
      console.log(req.body);
      db.messagePost(req.body.username, req.body.text, req.body.roomname);

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

