$(document).ready(function () {
    console.log("Document ready");
    $('.errormsg').hide();
    var socket = io();

    //function to check if form is empty or not and if full show div with message
    function formCheck () {
        if($('.result_blood_pressure').is(':empty') ||
           $('.result_weight').is(':empty') ||
           $('.result_blood_sugar').is(':empty')) {
            $('#formfilled').hide();
            console.log('forms are empty');
        } else {
            $('#formfilled').show();
            console.log('forms are full');
        }
    }


    $("#assessment_form").submit(function(e){
        // Hide previous error message in case it's still visible
        $('.errormsg').hide();
    
        // Retrieve text entered into text box
        var enteredText = $("#assessment_text").val();
        console.log("Form submitted - entered text: " + enteredText);
        
        // Send the message to the server via socket.io
        socket.emit('assessment', enteredText);
    
        // Clear the entered text from the text box
        $('#assessment_text').val('');
    
        // Do not reload page
        e.preventDefault();
    });

    
    socket.on('Blood Pressure', function(msg){
        $('.result_blood_pressure').html(msg);
        formCheck();
    });
    socket.on('Weight', function(msg){
        $('.result_weight').html(msg);
        formCheck();
    });
    socket.on('Blood Sugar', function(msg){
        $('.result_blood_sugar').html(msg);
        formCheck();
    });
    socket.on('Error', function(msg){
        $('.errormsg').html(msg);
        $('.errormsg').show();
    });
    
});