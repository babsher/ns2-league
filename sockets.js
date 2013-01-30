var settings = require('./settings');

module.exports.configure = function(io, sessionStore) {
   /*io.sockets.on('connection', function (socket) {
      socket.emit('news', { hello: 'world' });
      socket.on('my other event', function (data) {
         console.log(data);
      });
   });*/

   io.sockets.on("connection", function(socket){
      socket.sessionStore = sessionStore;
   });

};