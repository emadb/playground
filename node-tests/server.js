var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);
var taskCounter = 0;

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
    console.log('client connected');
    socket.on('new_task', function (data){
      taskCounter ++;
      console.log('Nuovo task: ' + data.task);
      socket.emit('new_task_callback', { description: data.task, id: taskCounter });  
    });

    socket.on('start_pomodoro', function (data){
      console.log('Partito pomodoro: ' + data.task);
    });
});
