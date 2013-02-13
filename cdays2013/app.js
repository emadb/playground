var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  for (var i = 100000000 - 1; i >= 0; i--) {
    
  };
  res.end('Hello World\n');
}).listen(3000, "127.0.0.1");

