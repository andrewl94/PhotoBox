const config = require('./config.json'); // Config file

var express = require('express');
var app = express();

const port = process.env.PORT || config.port;
var server = app.listen(port);

var io = require('socket.io').listen(server);
var fs = require('fs');// Manage files
var formidable = require('formidable');// form
var path = require('path');// path

var commentList = [];
var Clients = [];

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
                
                let arrayImgExtension = ['png', 'jpg', 'jpeg', 'bmp', 'svg', 'gif'];

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
app.get('/admin', function(req, res) { 
    res.render('admin.ejs', {title: config.application_name, clients: Clients});
})
app.post('/getAllImages', function(req, res){
    var obj = new Object();
    obj.hasFile = false;
    obj.files = [];

    fs.readdirSync(config.upload_path).forEach(file => {
        let extensionName = path.extname(config.upload_path + file).split('.').pop();

        let arrayImgExtension = ['png', 'jpg', 'jpeg', 'bmp', 'svg', 'gif'];

        if(arrayImgExtension.includes(extensionName.trim().toLowerCase())){
            var data = "";
            data = fs.readFileSync(config.upload_path + file);

            let base64Image = new Buffer(data, 'binary').toString('base64');
                                        
            //combine all strings
            let imgSrcString = `data:image/${extensionName};base64,${base64Image}`;
                        
            if(!obj.hasFile){
                obj.hasFile = true;
            }

            let fileObj = new Object();
            //send image src string into jade compiler
            fileObj.data = imgSrcString;
            fileObj.name = file;

            obj.files.push(fileObj);
        }
    });

    res.send(obj);
})
app.post('/getAllDeletedImages', function(req, res){
    var obj = new Object();
    obj.hasFile = false;
    obj.files = [];

    fs.readdirSync(config.deleted_path).forEach(file => {
        let extensionName = path.extname(config.upload_path + file).split('.').pop();

        let arrayImgExtension = ['png', 'jpg', 'jpeg', 'bmp', 'svg', 'gif'];

        if(arrayImgExtension.includes(extensionName.trim().toLowerCase())){
            var data = "";
            data = fs.readFileSync(config.deleted_path + file);

            let base64Image = new Buffer(data, 'binary').toString('base64');
                                        
            //combine all strings
            let imgSrcString = `data:image/${extensionName};base64,${base64Image}`;
                        
            if(!obj.hasFile){
                obj.hasFile = true;
            }

            let fileObj = new Object();
            //send image src string into jade compiler
            fileObj.data = imgSrcString;
            fileObj.name = file;

            obj.files.push(fileObj);
        }
    });

    res.send(obj);
})
app.post('/removeFile', function(req, res) { 
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var filename_old = config.upload_path + fields["filename"];
        var filename_new = config.deleted_path + fields["filename"];

        fs.rename(filename_old, filename_new, function(err){
            if (err) res.send(false);
            res.send(true);
        });
    });
})
app.post('/addFile', function(req, res) { 
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var filename_old = config.deleted_path + fields["filename"];
        var filename_new = config.upload_path + fields["filename"];
        
        fs.rename(filename_old, filename_new, function(err){
            if (err) res.send(false);
            res.send(true);
        });
    });
})
app.post('/checkAdminKey', function(req, res) { 
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let obj = new Object();
        obj.keyValid = (key === config.admin_key);
        if(fields.hasOwnProperty('admin_key')){
            var key = fields['admin_key'];

            obj.keyValid = (key === config.admin_key);
        }
        res.send(obj);
    });
})
/* if 404 */
.use(function(req, res, next){
    res.redirect('/');
});

/* real time */
io.sockets.on('connection', function (socket) {
    var address = socket.handshake.address;
    
    if(!Clients.includes(address)){
        Clients.push(address);
        socket.broadcast.emit('new_client', Clients);
    }

    socket.emit('get_clients', Clients);
    socket.emit('get_commentList', commentList);

    socket.on('add_new', function (commentObj) {
        commentObj.pseudo = commentObj.pseudo;
        commentObj.comment = commentObj.comment;
        commentList.push(commentObj);
        socket.broadcast.emit('add_new', commentObj);
    });
});
