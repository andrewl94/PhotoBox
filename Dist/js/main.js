var socket = io.connect('http://localhost');

socket.on('add_new', function(comment) {
    //addTask(task);
    console.log(comment);
});


/*$('#add').click(function () {
  var task = new Object();
  task.index = $('#todoList').children('.one_task').length;
  task.text = $('#task').val();
  socket.emit('add_task', task);

  addTask(task);

  $('.delete').unbind('click').click(function () {
      removeTask($(this).data('index'));
  });

  $('#task').val("");
});

socket.on('add_task', function(task) {
    addTask(task);

    $('.delete').unbind('click').click(function () {
      removeTask($(this).data('index'));
    });
});

socket.on('get_todoList', function(todolist) {
    $(todolist).each(function(){
      addTask(this);
    });
});

function addTask(task){
  var html = '<li class="one_task task_' + task.index + '">' + task.text + '<a class="delete" data-index="' + task.index + '">✘</a></li>';
  $('#todoList').append(html);
}*/

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
            url: './includes/callback.php',
            type: 'POST',
            data: oFormData,
            contentType: false,
            processData: false,
            dataFilter: function (data) {
                return data;
            },
            success: function (data, status) {
                $('#loader').hide();
                if(data==1){
                    $('#uploadOk').show();
                }
                else{
                    $.alert({
                        title: "Erreur",
                        content: data,
                        type: "red",
                        useBootstrap: false,
                        typeAnimated: true,
                        scrollToPreviousElement: false
                    });
                    $('#changeImg').trigger('click');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#loader').hide();
                alert(textStatus);
            }
        });
        
        return false;
    });

    $('#btnAddComment').on('click', function(){
        socket.emit('add_new', "Ceci est un test !");
        return false;
    });
});