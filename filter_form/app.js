var express = require("express");
var fs = require("fs");
var app = express();
var port = 3000;
var json;

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
    app.use(app.router);
});


app.get('/', function(req, res){
  res.header('Charset', 'utf-8')  
  var result = 'ciao!';
  res.send(result);  
});

app.get('/foo_values', function(req, res){
    res.header('content-type', 'application/json');
    res.send([1,2,3,4]);
});


app.listen(port);
console.log('Now serving the app at http://localhost:'+ port + '/');