var express = require('express');
var app = express();
var server = app.listen(80);
var ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
var io = require('socket.io').listen(server);

var commentList = [];

app.use(express.static('Dist'));
/* On affiche la todolist et le formulaire */
app.get('/', function(req, res) { 
    res.render('index.ejs');
})
/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/');
});

io.sockets.on('connection', function (socket) {
    socket.emit('get_commentList', commentList);

    socket.on('join', function (pseudo) {
        socket.broadcast.emit('user_join', ent.encode(pseudo));
    });

    socket.on('add_new', function (comment) {
        commentList.push(ent.encode(comment));
        socket.broadcast.emit('add_new', ent.encode(comment));
    });
});