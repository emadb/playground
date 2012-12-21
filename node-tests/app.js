var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', routes.index);

app.get('/test', function(req, res){
  res.render('index', {title: 'My Site emanuele', text:'questo testo lo metto dove voglio' });
});

app.post('/login', function(req, res){
  if (req.body.username === 'ema' && req.body.password === 'ema'){
    res.render('home', {title: 'welcome!', user: 'emanuele'});
  }
});

app.get('/user/:id', function(req, res){
    res.send('user ' + req.params.id);
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
