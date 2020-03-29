      var User = prompt('Choose a username:')
      while (User == '') {
        var User = prompt('Choose a username:')
      }
      var socket = io();
      $('form').submit(function(){
        socket.emit('chat message', { message: $('#m').val(), user: User });
        $('#m').val('');
        return false;
      });
      socket.on('chat message', function(msg){
        $('#messages').append($('<li>').html(msg));
      });
      socket.on('check users', function () {
        socket.emit('user active', User)
        // console.log('Sending user message');
      })
      socket.on('users update', function (msg) {
        // console.log('Recieved users');
        $('#users-inner').html(msg.join('<br>'))
      })
   