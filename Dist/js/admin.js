var socket = io.connect('http://localhost');

/**
 * event get client
 */
socket.on('get_clients', function(Clients) {
    $('#nbClient').html(Clients.length);
});

/**
 * event get comment list
 */
var commentList = [];
socket.on('get_commentList', function(commentList) {
    commentList = commentList;
    commentList.forEach(commentObj => {
        displayComment(commentObj);
    });
});

/**
 * event add new client
 */
socket.on('new_client', function(Clients) {
    $('#nbClient').html(Clients.length);
});

/**
 * event add new comment post
 */
socket.on('add_new', function(commentObj) {
    commentList.push(commentObj);
    displayComment(commentObj);
});

/**
 * event when new image upload
 */
socket.on('upload_ok', function() {
    alert('new image');
    getAllImages();
});

function getAllImages(){
    $.ajax({
        url: '/getAllImages',
        type: 'POST',
        success: function (data, status) {
            console.log(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
        }
    });
}

function displayComment(commentObj){
    let html = "<p>" + commentObj.pseudo + " : " + commentObj.comment + "</p>";
    $('#comment_container').append(html);
}

getAllImages();