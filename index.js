var express = require('express');
var app     = express();
var path    = require('path');
var http    = require('http').Server(app);
var io      = require('socket.io')(http);


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

//PARA JALAR LAS HOJAS DE ESTILO Y/O VISTAS, IMAGENES ETC.
app.use(express.static(path.join(__dirname, 'public')));

http.listen(3000, function(){
    console.log("THREE THOUSAND!");
});

io.on('connection', function(socket){
    console.log("USER CONNECTED!");
    //socket.join('Slap');
    socket.on('listen', function(msg){
        //io.to('Slap').emit('notify everyone', msg);
        console.log(io.sockets.sockets);
        socket.broadcast.emit('notify everyone', msg);
    })
})
