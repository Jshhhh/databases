  
let app = {
  server: null,
  data : null,
  currentName: window.location.search.split('=')[1],
  friends: [],
};

app.init = function() {

  $(document).ready(function(){

    $('#chats').on('click', '.username', app.handleUsernameClick);
    
    $('.submit').on('click', app.handleSubmit);

    $('.submit-room').on('click', function(){  
      let roomVal = $('#room-name').val()
      let roomObj = {
        username: '',
        text: '',
        roomname: roomVal,
      };
      app.send(roomObj);
      $('#room-name').val('')
    });

    $('select').on('change', app.refreshPage);

    setInterval(app.refreshPage, 1000);
    
    
  });


};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};



app.fetch = function() {
  $.ajax({
      url: app.server + '?order=-createdAt',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        // console.log('success', data);
      app.data = data;

      },
      error: function (error) {
        console.error('fail', error);
      }
  });
  
};

app.clearMessages = function () { 
  $('#chats').html('');
};

app.renderMessage = function(message) {
  if (message === undefined){
    return
  }  


  function escapeHtml(text) {
    return text
      .replace(/&/g, " ")
      .replace(/</g, " ")
      .replace(/>/g, " ")
      .replace(/"/g, " ")
      .replace(/'/g, " ");
  }
  
  let msg = '';
  let room = '';
  let user = '';

  if (message.username) {
    user = escapeHtml(message.username);
  }

  if (message.text) {
    msg = escapeHtml(message.text);
  }

  if (message.roomname) {
    room = escapeHtml(message.roomname);
  }  
  
  app.renderRoom(room);  
  
  $('#chats').prepend('<div class="chat"></div>');
  $('#chats .chat:first-child').append(`<div class="username"><a href="#">${user}</a></div><div>${msg}</div><div>${room}</div>`);
};

app.print = function(obj, callbck) {

  let callback = callbck || function (x) {return x};
 
  app.clearMessages();
  let results = obj.results;
  for (let i = results.length - 1; i >= 0; i--) {
    app.renderMessage(callback(results[i]));
  }
};

app.renderRoom = function(roomName) {
  if (roomName === undefined || roomName === '' || roomName === ' ') {
    return;
  }

  let optionsList = $('#roomSelect').children();
  
  for (let i = 0; i < optionsList.length; i++) {
    if (optionsList[i].innerText === roomName) {
      return;
    }
  }
  
  $('#roomSelect').append(`<option>${roomName}</option>`);

}

  

app.handleUsernameClick = function (){
  let friendName = this.innerText
  app.friends.push(friendName)
};


app.handleSubmit = function (){
  let msg = {};
  msg.username = app.currentName;
  msg.text = $('#message').val();
  msg.roomname = $('#roomSelect').val();  
  
  app.send(msg);
  $('#message').val('')
};



app.init();

app.refreshPage = function() {
  app.fetch();
  
  if (app.data !== null){  

    let selectVal = $('#roomSelect').val();

    if (selectVal === "All Messages") {
      app.print(app.data);
    } else {
      app.print(app.data, function(message) {
        if (message.roomname === selectVal) {
          return message;  
        }
      });
    }
 }

  let chatsArray = $('#chats').children()

  for (var i = 0; i < chatsArray.length; i++){
    let username = chatsArray[i].children[0].innerText
    let messageNode = chatsArray[i].children[1]
      if (app.friends.includes(username)) {
        $(messageNode).css('font-weight', 'bold')
    }
  }


};































