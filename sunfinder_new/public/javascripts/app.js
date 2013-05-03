$(function(){
	$('#go').click(function(){
		var lat = $('#lat').val();
		var lon = $('#lon').val();

		console.log('yo');
		$.get('/weather?lat=' + lat + '&lon=' + lon, function(response){
			console.log('finish');
			console.log(response);
		});

		return false;
	})
})