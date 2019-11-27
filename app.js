var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    fs.readFile('./Views/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var io = require('socket.io').listen(server);

var commentList = [];
io.sockets.on('connection', function (socket) {
    socket.emit('get_todoList', commentList);

    socket.on('join', function (pseudo) {
        socket.broadcast.emit('user_join', pseudo);
    });

    socket.on('add_new', function (comment) {
        todolist.push(comment);
        socket.broadcast.emit('add_new', comment);
    });
});

server.listen(8080);
