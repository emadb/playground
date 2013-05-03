var rest = require('restler');
var MongoClient = require('mongodb').MongoClient
var _ = require('underscore'); 
var async = require('async');


exports.index = function(req, res){
  res.render('index', { title: 'Sunfinder' });
};

exports.weather = function(req, res){
	
	MongoClient.connect("mongodb://localhost:27017/sunfinder", function(err, client) {
	    var collection = client.collection('cities');
	    
	    var lat = req.query['lat'];
	    var lon = req.query['lon'];

	   

	    var distance = 800;

	    var results = [];
	    var semaphore = true;

	    cursor = collection
	    	.find( {loc:{$near: [lat, lon], $maxDistance: distance/111.12}}).limit(5)
	    	.toArray(function(err, docs){
	    		
	    		async.eachSeries(docs, function(doc){
	    			
					if (doc != null)
			        {
			        	console.log('### get weather');
			        	
			        	var wheaterInfo = getWeather(doc, function(wheaterInfo){
			        		results.push(wheaterInfo);	
			        		console.log('### got it', results.length);
			        	});
			        }
	    		}, function(err){
	    			console.log('### completed');
	    			client.close();
	    			res.send(results);
	    		});
	    	});
	});
};

function getWeather(doc, callback){
	var  url = "http://api.openweathermap.org/data/2.5/weather?lat="+ doc.loc[0] + "&lon=" + doc.loc[1] + "&units=metric&lang=it";
    rest.get(url).on('complete', function(result){
        var meteo = JSON.parse(result);
        //if (meteo.clouds.all < 40){
        console.log('### callback');
        callback({name: meteo.name, condition: meteo.weather[0].main});
        //}                
    });
}