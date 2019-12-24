var socket = io.connect('http://localhost');
$(document).ready(function () {

    /* SET AND DISPLAY THE PREVIEW */
    $('#fileInput').on('change', function(){
        var extensionarray = ['jpeg', 'jpg', 'bmp', 'png', 'gif'];

        var file    = document.querySelector('input[type=file]').files[0];
        var extension = file.name.substr(file.name.lastIndexOf('.') + 1, file.name.length - 1).toLowerCase();
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            $('#imageToUpload').attr('src', reader.result);
          }, false);

        // check the file extension
        if ($.inArray(extension, extensionarray) > -1) {
            if (file) {
                reader.readAsDataURL(file);
                $('#imageSet_container').show();
                $('#input_container').hide();
            }
            else{
                $('#imageSet_container').hide();
                $('#input_container').show();
            }
        }
        else{
            $('#imageSet_container').hide();
            $('#input_container').show();

            $.alert({
                title: 'L\'extension (*.' + extension + ') n\'est pas autorisée.',
                content: 'Seules les extensions de fichier suivantes sont autorisées : <br/>' + extensionarray.join(', ') + '.',
                type: "red",
                boxWidth: ($(document).width() > 600 ? '60%' : '90%'),
                useBootstrap: false,
                typeAnimated: true
            });
        }

    });

    /* REMOVE FILE AND RESET PREVIEW */
    $('#changeImg').on('click', function(){
        $('#fileInput').val('');
        $('#imageToUpload').attr('src', '');
        $('#imageSet_container').hide();
        $('#input_container').show();
        $('#uploadOk').hide();
    });
    $('#newImg').on('click', function(){
        $('#changeImg').trigger('click');
    });

    /* UPLOAD FILE */
    $('#btnValid').on('click', function(){
        var oFile = document.getElementById("fileInput").files[0];
        var oFormData = new FormData();
        oFormData.append('file', oFile);

        $('#imageSet_container').hide();
        $('#input_container').hide();
        $('#uploadOk').hide();
        $('#loader').show();

        $.ajax({
            url: '/sendImage',
            type: 'POST',
            data: oFormData,
            contentType: false,
            processData: false,
            dataFilter: function (data) {
                return data;
            },
            success: function (data, status) {
                if(data){
                    $('#uploadOk').show();
                    socket.emit('upload_ok');
                }
                else{
                    $.alert({
                        title: "Erreur",
                        content: "Une erreur est survenue lors de l'envoie. Veuillez réessayer ultérieurement.",
                        type: "red",
                        boxWidth: ($(document).width() > 600 ? '60%' : '90%'),
                        useBootstrap: false,
                        typeAnimated: true,
                        scrollToPreviousElement: false
                    });
                    $('#changeImg').trigger('click');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.alert({
                    title: "Erreur",
                    content: "Une erreur est survenue lors de l'envoie. Veuillez réessayer ultérieurement.<br />" + XMLHttpRequest.responseText,
                    type: "red",
                    boxWidth: ($(document).width() > 600 ? '60%' : '90%'),
                    useBootstrap: false,
                    typeAnimated: true,
                    scrollToPreviousElement: false
                });
                $('#changeImg').trigger('click');
            },
            complete: function(){
                $('#loader').hide();
            }
        });
        
        return false;
    });

    $('#btnAddComment').on('click', function(){
        window.location.href = "/addComment";
    });
});