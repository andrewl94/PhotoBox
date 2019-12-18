const config = require('./config.json');

var express = require('express');
var app = express();

const port = process.env.PORT || config.port;
var server = app.listen(port);

var ent = require('ent'); // Remove HTML chars (like htmlentities - PHP)
var io = require('socket.io').listen(server);
var fs = require('fs');// Manage files
var formidable = require('formidable');// form
var path = require('path');// path

var commentList = [];

/* CSS / JS / iMAGES */
app.use(express.static('Dist'));

/* routes */
app.get('/', function(req, res) { 
    res.render('index.ejs', {title: config.application_name});
})
app.get('/slideshow', function(req, res) { 
    res.render('slideshow.ejs', {title: config.application_name});
})
app.get('/addComment', function(req, res) { 
    res.render('addComment.ejs', {title: config.application_name});
})
app.post('/sendImage', function(req, res) { 
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            // oldpath : temporary folder to which file is saved to
            var oldpath = files.file.path;
            // Count number of files in the folder
            var nbFiles = 0;
            fs.readdir(config.upload_path, (err, files) => {
                if(err){
                    res.send(false);
                }
                nbFiles = files.length;
            });
            var newpath = config.upload_path + "photo_" + nbFiles + "_" + files.file.name;
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
    fs.readdir(config.upload_path, function (err, files) {
        //handling error
        if (err) {
            res.status(500).send('Unable to scan directory: ' + err);
        }
        var obj = new Object();
        obj.hasImg = false;
        obj.data = null;
        
        if(files.length > 0){
            var rand = Math.floor(Math.random() * (files.length) );
        
            var file = files[rand];
            
            fs.readFile(config.upload_path + file, (err, data)=>{
                //error handle
                if(err) res.status(500).send(err);
                
                //get image file extension name
                let extensionName = path.extname(config.upload_path + file).split('.').pop();
                
                let arrayImgExtension = ['png', 'jpg', 'jpeg', 'bmp', 'svg'];

                if(arrayImgExtension.includes(extensionName.trim().toLowerCase())){
                    //convert image file to base64-encoded string
                    let base64Image = new Buffer(data, 'binary').toString('base64');
                                    
                    //combine all strings
                    let imgSrcString = `data:image/${extensionName};base64,${base64Image}`;

                    obj.hasImg = true;
                    //send image src string into jade compiler
                    obj.data = imgSrcString;
                }
                res.send(obj);
            })
        }
        else{
            res.send(obj);
        }

        
    });
})
/* if 404 */
.use(function(req, res, next){
    res.redirect('/');
});

/* real time */
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
