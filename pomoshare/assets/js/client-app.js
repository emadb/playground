$(function() {
	var socket = io.connect('http://192.168.23.32');	

	socket.on('pomodoro_started', function (message){
    	console.log(message);
	});

	socket.on('update_timer', function(data){
    	$('#timer').html(data.time.m + ':' + data.time.s);
    });

    socket.on('new_user', function(data){
    	$('#users ul').append('<li>' + data.user + '</li>');
    });

    socket.on('pomodoro_completed', function(data){
    	$('#start').addClass('success');
    	$('#start').removeAttr('disabled');
    });

    socket.on('retalk', function(data){
        $('#chat').append("<li>(" + data.user +"): " + data.text + "</li>");
    });

    $('#talk').click(function() {
        var user = $('#user').val();
        var text = $('#textTalk').val();
        $('#chat').append("<li>(" + user +"): " + text + "</li>"); 
        $('#textTalk').val('');
        socket.emit('talk', {user: user, text: text});
    });

	$('#connect').click(function(){
		$('#connect').text('disconnect');
		$('#connect').addClass('danger');
		
		var user = $('#user').val();
		socket.emit('add_user', {user: user});
		
		$('#users ul').append('<li>' + user + '</li>');
		$('#user').attr('disabled', 'disabled');
	});	

    $('#start').click(function () {
    	socket.emit('start_pomodoro', { user: $('#user').val()});
    	$(this).removeClass('success');
    	$(this).attr('disabled', 'disabled');
    });
})