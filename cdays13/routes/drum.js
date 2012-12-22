
exports.showDrum = function(req, res){
  res.render('drum', { title: 'drums machine' });
};

exports.init = function(io){
    io.sockets.on('connection', function (socket) {
        socket.on('play', function (data) {
            socket.broadcast.emit('played', data);
        });
    });
}