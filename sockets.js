var settings = require('./settings');
var app = require('./application');

module.exports.configure = function(io) {
   /*io.sockets.on('connection', function (socket) {
      socket.emit('news', { hello: 'world' });
      socket.on('my other event', function (data) {
         console.log(data);
      });
   });*/

   io.sockets.on("connection", function(socket){
      socket.sessionStore = app.sessionStore;
   });

};