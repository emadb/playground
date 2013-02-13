var MongoClient = require('mongodb').MongoClient;


exports.index = function(req, res){
    MongoClient.connect("mongodb://localhost:27017/cdays13", function(err, db) {
        if (err === null){
            var collection = db.collection('biblio');
            collection.find().toArray(function(err, cursor) {
                var result = [];
                for (var i = 0; i < 10; i++) {
                    if (cursor !== null)
                        result.push(cursor[i]);
                };
                res.render('index', { title: 'Express', items: result });    
                db.close();
            });
        }
        else {
            console.log(err);
        }

    });
    
};