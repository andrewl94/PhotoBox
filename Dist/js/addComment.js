var socket = io.connect('http://localhost');
$('#alert_container').hide();

/**
 * Event keypress on every input to display or not the submit button
 */
$('.inputText').on('keypress', function(){
    $('#btnNewComment').prop("disabled", $('#pseudo').val().trim().length == 0 || $('#comment').val().trim().length == 0);
});

/**
 * Event click of the submit button
 */
$('#btnNewComment').click(function () {
    if(validation()){
        var commentObj = new Object();
        commentObj.pseudo = $('#pseudo').val();
        commentObj.comment = $('#comment').val();

        // Post the comment
        socket.emit('add_new', commentObj);

        $('#alert_container').show();
        $('#form_comment_container').hide();
    }
    
    $('#pseudo').val("");
    $('#comment').val("");
    $('#btnNewComment').prop("disabled", true);

    return false;
  });

  /**
   * Form validation
   * return true if the validation is ok
   */
function validation(){
    var isValid = true;

    if($('#pseudo').val().trim().length == 0 || $('#comment').val().trim().length == 0){
        isValid = false;
        $.alert({
            title: 'Formulaire incomplet',
            content: 'Veuillez renseigner tous les champs obligatoire.',
            type: "red",
            boxWidth: ($(document).width() > 600 ? '60%' : '90%'),
            useBootstrap: false,
            typeAnimated: true
        });
        $('#pseudo').addClass(($('#pseudo').val().trim().length == 0 ? "is-invalid" : "is-valid"))
        .unbind('change').on('change', function(){
            if($('#pseudo').val().trim().length > 0){
                $('#pseudo').removeClass("is-invalid");
            }
        });
        $('#comment').addClass(($('#comment').val().trim().length == 0 ? "is-invalid" : "is-valid"))
        .unbind('change').on('change', function(){
            if($('#comment').val().trim().length > 0){
                $('#comment').removeClass("is-invalid");
            }
        });
    }

    return isValid;
}