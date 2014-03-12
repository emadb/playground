var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , path = require('path');

var pomodoro = 1500;
app.listen(8000);


function handler (req, res) {
    var filePath = '.' + req.url;
    if (filePath == './')
        filePath = './index.html';
         
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    console.log('request: ' + filePath);
     
	fs.readFile(filePath, function(error, content) {
    	if (error) {
        	res.writeHead(500);
            res.end();
        }
        else {
        	res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

var global_socket;
var users = [];
var pomodoroId;

io.sockets.on('connection', function (socket) {
	global_socket = socket;
    socket.on('start_pomodoro', function (data){
    	pomodoroId = setInterval(countdown, 1000);
		  socket.broadcast.emit('pomodoro_started', { message: 'hola' });
    });

    socket.on('add_user', function(data){
    	users.push(data.user);
    	socket.broadcast.emit('new_user', { user: data.user });
    });

    socket.on('talk', function (data){
        socket.broadcast.emit('retalk', data);
    });
});

function countdown(){
 	pomodoro--;
    var time = toTime(pomodoro);
    global_socket.emit('update_timer', {time: time});
    global_socket.broadcast.emit('update_timer', {time: time});

    if (pomodoro === 0){
    	clearInterval(pomodoroId);
        console.log('terminato pomodoroId: ' + pomodoroId);
        global_socket.broadcast.emit('pomodoro_completed', {});
        global_socket.emit('pomodoro_completed', {});
        pomodoro = 1500;
    }
}

function toTime(secs) {
  var hours = Math.floor(secs / (60 * 60));  
  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);
  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var obj = {
      "h": hours,
      "m": minutes.toString().length > 1 ? minutes : '0' + minutes,
      "s": seconds.toString().length > 1 ? seconds : '0' + seconds,
  };
  
  return obj;
}

