var app = require('./application');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
require('./sockets').configure(io);

server.listen(3000);