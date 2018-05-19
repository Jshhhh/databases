var models = require('../models');

module.exports = {
  messages: { // a function which handles posting a message to the database
    get: function (req, res) {
      // console.log('request', req);
      models.messages.get(req, res);
      // res.send('CONTROL GET RECIEVED');
      // res.end();
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // console.log('GETTING POSTTTTT', req.body);
      models.messages.post(req, res);
      res.send('CONTROL POST RECIEVED');
      res.end();
    }
  },
  users: {
    // Ditto as above
    get: function (req, res) {
      res.end();
    },
    post: function (req, res) {
      res.end();
    }
  }
};

