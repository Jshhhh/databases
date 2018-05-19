var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {

  }, // a function which produces all the messages
    post: function (req, res) {
      db.messagePost(req.body.username, req.body.message, req.body.roomname);

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

