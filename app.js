var express = require('express');
var app = express();
var server = app.listen(80);
var ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
var io = require('socket.io').listen(server);
var fs = require('fs');// Gestion des fichiers
var formidable = require('formidable');//formulaire
var path = require('path');//path

var commentList = [];
var upload_path = "D:\\Alexis\\Images\\WallPaper\\";

/* Gestion static : CSS / JS / iMAGES */
app.use(express.static('Dist'));

/* routes */
app.get('/', function(req, res) { 
    res.render('index.ejs');
})
app.get('/slideshow', function(req, res) { 
    res.render('slideshow.ejs');
})
app.get('/addComment', function(req, res) { 
    res.render('addComment.ejs');
})
app.post('/sendImage', function(req, res) { 
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      // oldpath : temporary folder to which file is saved to
      var oldpath = files.file.path;
      var newpath = upload_path + files.file.name;
      // copy the file to a new location
      fs.rename(oldpath, newpath, function (err) {
          if(err){
            res.send(false);
          }
          else{
            res.send(true);
          }
      });
    });
})
app.post('/getRandomImage', function(req, res) {
    fs.readdir(upload_path, function (err, files) {
        //handling error
        if (err) {
            res.send('Unable to scan directory: ' + err);
        }
        var rand = Math.floor(Math.random() * (files.length) );
        
        var file = files[rand];

        fs.readFile(upload_path + file, (err, data)=>{
            //error handle
            if(err) res.status(500).send(err);
            
            //get image file extension name
            let extensionName = path.extname(upload_path + file);
            
            //convert image file to base64-encoded string
            let base64Image = new Buffer(data, 'binary').toString('base64');
            
            //combine all strings
            let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
            
            //send image src string into jade compiler
            res.send(imgSrcString);
        })
    });
})
/* Si URL non existante */
.use(function(req, res, next){
    res.redirect('/');
});

/* Gestion temps réel */
io.sockets.on('connection', function (socket) {
    socket.emit('get_commentList', commentList);

    socket.on('join', function (pseudo) {
        socket.broadcast.emit('user_join', ent.encode(pseudo));
    });

    socket.on('add_new', function (commentObj) {
        commentObj.pseudo = ent.encode(commentObj.pseudo);
        commentObj.comment = ent.encode(commentObj.comment);
        commentList.push(commentObj);
        socket.broadcast.emit('add_new', commentObj);
    });
});