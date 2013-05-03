var rest = require('restler');

var appid = 'dj0yJmk9YUVzcGFYY0pnbU91JmQ9WVdrOU1XRlROVzFSTm1zbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0xOQ--'
var baseUrl = 'http://where.yahooapis.com/v1'
var startingLocation = '12591840'


//rest.get(baseUrl + '/place/' + startingLocation + '/siblings?appid=' + appid).on('complete', findNeighbors);



var MongoClient = require('mongodb').MongoClient


var url = "mongodb://localhost:27017/sunfinder";


MongoClient.connect(url, function(err, client) {
    var collection = client.collection('cities');
    var count = collection.count();
    
    var brescia = [45.52478, 10.22727];
    var palermo = [38.11572, 13.36143];
    var test = [37.50904, 13.52556]

    cursor = collection.find( {loc:{$near: test, $maxDistance: 100}});
    cursor.each(function(err, doc) {
        if (doc != null)
        {
            var  url = "https://api.forecast.io/forecast/ccdda5c8a05cf7d7bdb47495d48855d7/" + doc.loc[0] + "," + doc.loc[1];
            rest.get(url).on('complete', function(result){
                if (result.currently.summary == 'Clear')
                    console.log(doc.name, result.currently.summary);    
                else
                    console.log('.');
                
            });
            
        }
        client.close();
    });
    

    
});
