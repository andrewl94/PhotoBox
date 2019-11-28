var socket = io.connect('http://localhost');

socket.on('add_new', function(comment) {
    //addTask(task);
    console.log(comment);
});

getRandomImage();

function getRandomImage(){
    $.ajax({
        url: '/getRandomImage',
        type: 'POST',
        success: function (data, status) {
            $('#slideshow_container').css('background', 'url(' + data + ')');
            setTimeout(getRandomImage, 5000); 
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
            getRandomImage();
        }
    });
}