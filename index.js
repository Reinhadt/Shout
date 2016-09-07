var express = require('express');
var app     = express();
var path    = require('path');
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

var clients = [];

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

    socket.on('get name', function(n){

        var clientInfo = new Object();
            clientInfo.name         = n;
            clientInfo.clientId     = socket.id;
            clients.push(clientInfo);


      if(n == "omar"){
        //En lugar de hacer join a un room, obtengo el id de mi usuario y luego lo guardo
        //entonces mando ese id a la función listen.
        //socket.join(n);
        identifier = socket.id;
        console.log(socket.id);
      }

    })


    function findName(people){
        return people.clientId == socket.id;
    }


    socket.on('listen', function(msg){

        console.log(clients);

        var o = clients.find(findName);
        var w = o.name;

        console.log(w);

        var data = new Object();
        data.name = w;
        data.message = msg;

        io.to(identifier).emit('notify everyone', data);
        //console.log(io.sockets.sockets);
        //socket.broadcast.emit('notify everyone', msg);
    });


    socket.on('disconnect', function (data) {

            for( var i=0, len=clients.length; i<len; ++i ){
                var c = clients[i];

                if(c.clientId == socket.id){
                    clients.splice(i,1);
                    break;
                }
            }

            console.log(clients);

        });



})
