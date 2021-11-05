const express = require('express');
var app = require('express')()
const PORT = process.env.PORT || 3001;
var io  = require('socket.io').listen(server);
 
app.use(express.static('public'));
 
app.get('/', (req, res) => {
    res.send('Hello World!');
});
io.sockets.on('connection', function(socket){
    socket.on('orientationEvent', function(data) {
        //console.log(data)
        socket.broadcast.emit('update_orientationEvent', data);
    })
});

 
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));