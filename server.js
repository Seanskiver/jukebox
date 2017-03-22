//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];
var playQ = [
  {"title": 'title: Marcus Cobe vs Vicetone ft. Chloe Angelides - White Lies (Free)', "uri": 'https://api.soundcloud.com/tracks/263203587'},  
  {"title":'ODESZA - White Lies (Tim Derry RMX)', "uri": "https://api.soundcloud.com/tracks/269226593"},
  {"title":"Sumantix (Axel F & The Butcher) - 'This is F*ckin Hard Electro Dude' Mix", "uri": "https://api.soundcloud.com/tracks/51843387"},
  {"title":"End Of Numbers - The Acoustic Sessions", "uri":"https://api.soundcloud.com/tracks/129690508"}
];
var playCount = 0;


io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
    });
    
    socket.on('pause', function() {
      console.log('pause');
      broadcast('pause', 'pause');  
    });
    
    socket.on('play', function() {
      console.log('play');
      broadcast('play', 'play');      
    });
    
    socket.on('next', function() {
      console.log('next');
      broadcast('next', playQ[playCount]);
      playCount++;
    });


});


function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
