$(function(){
	$('#go').click(function(){
		var lat = $('#lat').val();
		var lon = $('#lon').val();

		console.log('yo');
		$.get('/weather?lat=' + lat + '&lon=' + lon, function(response){
			console.log(response);
			$('#items').html('');
			$(response).each(function(i, item){
                var element = '<li>' + item.name + '&nbsp;&nbsp;<span>' + item.condition + '&nbsp;&nbsp;</span><small>' + item.clouds +'</small></li>';
                
                $('#items').append(element);
            });
		});

		return false;
	})
})