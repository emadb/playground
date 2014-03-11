var express = require("express");
var fs = require("fs");
var app = express();
var port = 8081;
var json;

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/'));
    app.use(app.router);
});


app.get('/', function(req, res){
  res.header('Charset', 'utf-8')  
  var result = 'ciao!';
  res.send(result);  
});

app.listen(port);
console.log('Now serving the app at http://localhost:'+ port + '/');