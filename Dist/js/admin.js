var socket = io.connect('http://localhost');

/**
 * event get client
 */
socket.on('get_clients', function(Clients) {
    $('#nbClient').html(Clients.length-1);
});

/**
 * event get comment list
 */
var commentList = [];
socket.on('get_commentList', function(commentList) {
    commentList = commentList;
    $('#comment_admin_container').html('');
    commentList.forEach(commentObj => {
        displayComment(commentObj);
    });
    if($('#comment_admin_container').html().length == 0){
        $('#comment_admin_container').html('Aucun commentaire pour le moment...');
    }
});

// Init
getAllImages();
getDeletedImages();

/**
 * event add new client
 */
socket.on('new_client', function(Clients) {
    $('#nbClient').html(Clients.length-1);
});

/**
 * event add new comment post
 */
socket.on('add_new', function(commentObj) {
    if(commentList.length==0){
        $('#comment_admin_container').html('');
    }
    commentList.push(commentObj);
    displayComment(commentObj);
});

/**
 * event when new image upload
 */
socket.on('upload_ok', function() {
    getAllImages();
});

/*
 * Authorize access
 */
$(document).ready(function(){
    $('#admin_panel_container').hide();
    var confirm = $.confirm({
        title: 'Identification key required',
        content: '' +
        '<label for="admin_key">Admin key :</label>' +
        '<input id="admin_key" type="password" placeholder="" />' +
        '',
        type: 'red',
        icon: 'fas fa-exclamation-triangle',
        draggable: false,
        boxWidth: ($(document).width() > 600 ? '60%' : '90%'),
        useBootstrap: false,
        scrollToPreviousElement: false,
        buttons: {
            Confirm: {
                btnClass: 'btn-red',
                action: function () {
                    // Validation
                    if($('#admin_key').val().trim().length == 0){
                        $.alert({
                            title: 'Missing Admin Key',
                            content: 'Please enter the admin key.',
                            type: 'red',
                            boxWidth: ($(document).width() > 600 ? '60%' : '90%'),
                            useBootstrap: false,
                        });
                        $('#admin_key').addClass('error').unbind('change').on('change', function(){
                            $('#admin_key').removeClass('error');
                        });
                    }
                    // Check
                    $.ajax({
                        url: '/checkAdminKey',
                        type: 'POST',
                        data: {
                            admin_key: $('#admin_key').val().trim()
                        },
                        success: function (data, status) {
                            if(data.keyValid){
                                confirm.close();
                                $('#admin_panel_container').show();
                            }
                            else{
                                $.alert({
                                    title: 'Invalid admin key',
                                    content: 'Please enter the valid admin key.',
                                    type: 'red',
                                    boxWidth: ($(document).width() > 600 ? '60%' : '90%'),
                                    useBootstrap: false,
                                });
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            $.alert({
                                title: 'Error',
                                content: 'An error has occurred, please try again later.<br />' + XMLHttpRequest.responseText,
                                type: 'red',
                                boxWidth: ($(document).width() > 600 ? '60%' : '90%'),
                                useBootstrap: false,
                            });
                        }
                    });
                    return false;
                }
            },
        }
    });
});

/*
 * Get all slideshow files
 */
function getAllImages(){
    $('#file_container').html('<div id="loader" style="display:block;"></div>');
    $.ajax({
        url: '/getAllImages',
        type: 'POST',
        success: function (data, status) {
            var html = "";
            if(data.hasFile){
                data.files.forEach(file => {
                    html += "<div class=\"img_container\">";
                    html += "<img src=\"" + file.data + "\" />";
                    html += "<p>" + file.name + "</p>";
                    html += '<button class="btn btn-danger" onclick="toggleFile(\''+ file.name +'\', true)"><i class="fas fa-ban"></i> Delete from the slideshow</button>';
                    html += "</div>";
                });
            }
            else{
                html = "No images for the moment..."
            }
            $('#file_container').html(html);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#file_delete_container').html(html);
        }
    });
}

/*
 * Get all deleted files
 */
function getDeletedImages(){
    $('#file_delete_container').html('<div id="loader" style="display:block;"></div>');
    $.ajax({
        url: '/getAllDeletedImages',
        type: 'POST',
        success: function (data, status) {
            var html = "";
            if(data.hasFile){
                data.files.forEach(file => {
                    html += "<div class=\"img_container\">";
                    html += "<img src=\"" + file.data + "\" />";
                    html += "<p>" + file.name + "</p>";
                    html += '<button class="btn btn-success" onclick="toggleFile(\''+ file.name +'\', false)"><i class="fas fa-plus"></i> Add to slideshow</button>';
                    html += "</div>";
                });
            }
            else{
                html = "No images for the moment..."
            }
            $('#file_delete_container').html(html);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#file_delete_container').html(html);
        }
    });
}

/*
 * Display comment
 */
function displayComment(commentObj){
    let html = "<p><strong>" + commentObj.pseudo + " :</Strong> " + commentObj.comment + "</p>";
    $('#comment_admin_container').append(html);
}

/*
 * Remove or Add file to slideshow
 */
function toggleFile(filename, removed){
    $('#file_delete_container').html('<div id="loader" style="display:block;"></div>');
    $('#file_container').html('<div id="loader" style="display:block;"></div>');
    $.ajax({
        url: '/' + ( removed ? 'removeFile' : 'addFile'),
        type: 'POST',
        data: { filename: filename},
        success: function (data, status) {
            if(data){
                getAllImages();
                getDeletedImages();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            getAllImages();
            getDeletedImages();
        }
    });
}
