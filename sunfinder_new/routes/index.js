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
	    
	    var lat = parseFloat(req.query['lat']);
	    var lon = parseFloat(req.query['lon']);

	    var distance = 1000;

	    var results = [];
	    var semaphore = true;

	    cursor = collection
	    	.find( {loc:{$near: [lat, lon], $maxDistance: distance/111.12}}).limit(5)
	    	.toArray(function(err, docs){
	    	
	    	var max = docs.length;
	    	var count = 0;

	    	_.each(docs, function(doc){
	    		
	    		if (doc != null)
			    {   	
			       	var wheaterInfo = getWeather(doc, function(wheaterInfo){
						count ++;
						if (wheaterInfo != null){
							results.push(wheaterInfo);	
							console.log(count, wheaterInfo);
							if (count === max){
								client.close();
								res.send(results);
							}
						}

		        	});
		        }
				else{
					count ++;
				}
    			
    		});
    	});
	});
};

function getWeather(doc, callback){
	var  url = "http://api.openweathermap.org/data/2.5/weather?lat="+ doc.loc[0] + "&lon=" + doc.loc[1] + "&units=metric&lang=it";
    rest.get(url).on('complete', function(result) {
        var meteo = JSON.parse(result);
        if (parseInt(meteo.clouds.all) < 40){
        	callback({name: meteo.name, condition: meteo.weather[0].main, clouds: meteo.clouds.all});
        }        
		else{
			callback(null);
		}
    });
}