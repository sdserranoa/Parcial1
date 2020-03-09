let socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

socketApi.io = io;

const state = {
    licitaciones: [
        
    ]
}

io.on('connection', function (socket) {

    io.sockets.emit('licitaciones',state.licitaciones);

    socket.on("new-licitacion", data => {
        console.log(data);
        if(state.licitaciones.length<=0){
            data.oferta = 150000000;
        }
        else{
            data.oferta = Math.random();
        }
        const aux = state.licitaciones.concat(data);
        state.licitaciones = aux;
        socketApi.sendNotification();
    })
});

socketApi.sendNotification = () => {
    io.sockets.emit('licitaciones',state.licitaciones);
}

module.exports = socketApi;