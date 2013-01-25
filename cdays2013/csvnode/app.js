var startTime = new Date();

var csv = require('csv');
var fs = require('fs');
var mongo = require('mongodb').MongoClient;

mongo.connect("mongodb://localhost:27017/cdays13", function(err, db) {
    
    var biblio = db.collection('biblio');

    csv()
    .from.stream(fs.createReadStream(__dirname + '/' + process.argv[2]))
    .on('record', function(data,index){
        if (index > 0){
            var obj = {
                type: data[1],
                address: data[2],
                zipCode: data[3],
                city: data[4],
                province: data[5]
            };

            biblio.insert(obj, {w:0});
        }
    })
    .on('end', function(count){
        console.log('Imported ' + count + ' records');
        var endTime = new Date();
        console.log(endTime - startTime);
        process.exit(0);
    });
});

