var socket = io.connect('http://localhost');
var commentList = [];
var index = 1;

/**
 * event add new comment post
 */
socket.on('add_new', function(commentObj) {
    commentObj.id = commentList.length + 1;
    commentList.push(commentObj);
});

getRandomImage();
getNextComment();

/**
 * Get a random picture in the folder
 */
function getRandomImage(){
    $.ajax({
        url: '/getRandomImage',
        type: 'POST',
        success: function (data, status) {
            $('#slideshow_container').css('background-image', 'url(' + data + ')');
            // Call this function every 5 sec
            setTimeout(getRandomImage, 5000); 
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            getRandomImage();
        }
    });
}

/**
 * Get the next comment post in the array
 * Display the comment div if there is another comment next
 */
function getNextComment(){
    var commentObj = $.grep(commentList, (e) => { return e.id == index;})[0];
    if(commentObj==null){
        $('#comment_container').hide();
    }
    else{
        $('#comment_container').show();
        let html = "<p><b>" + commentObj.pseudo + " :</b> " + commentObj.comment + "</p>"
        $('#comment_container').html(html);
        index++;
    }
    // Call this function every 5 sec
    setTimeout(getNextComment, 5000); 
}