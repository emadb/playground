var express = require('express');
var mongojs = require('mongojs');

var app = express();
var db = mongojs('node-test', ['contacts']);

db.contacts.save({name: 'emanuele', surname: 'delbono', email: 'emanuele@codiceplastico.com'});

app.get('/hello', function(req, res){
  res.send('hello world');
});

app.get('/contacts', function(req, res){
    db.contacts.find(function(err, contacts) {
        console.log(contacts);
        res.send(contacts);
    });
});

app.post('/contacts', function(req, res){
    console.log(req, res);
});

app.listen(3000);
console.log('Listening on port 3000');