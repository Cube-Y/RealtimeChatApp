var app = require('express')()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var POST = 3000;

app.get('/',function(req, res) {

    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket) {

    console.log('入室したID : %s', socket.id);

    io.emit('message', socket.id + 'さんが入室しました !', 'System');


    socket.on('message', function(msj) {
        io.emit('message', msj, socket.id);
    });


    socket.on('disconnect', function(e) {
        console.log('接続が切れたID : %s', socket.id);
    });
});


http.listen(POST, function() {
    console.log('接続を開始しました。', POST);
});