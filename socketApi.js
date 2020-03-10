let socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

socketApi.io = io;

const state = {
    licitaciones: [
        
    ],
    mayor: 0,
    aceptada: false
}

io.on('connection', function (socket) {

    io.sockets.emit('licitaciones',state.licitaciones);
    if(state.aceptada){
        socketApi.sendNotificationAceptado();
    }

    socket.on("new-licitacion", data => {
        
        if(state.licitaciones.length<=0){
            data.oferta = 150000000;
        }
        else{
            data.oferta = state.mayor + Math.floor(Math.random() * (10000000 - 5000000 + 1)) + 5000000;
        }
        state.mayor = data.oferta;

        var PB = (Math.random() * (0.8 - 0.3 )) + 0.3;
        var PO = (Math.random() * (0.8 - 0.3 )) + 0.3;

        if(PO>PB){
            socketApi.sendNotificationAceptado();
            data.aceptada = true;
            state.aceptada = true;
        }
        
        const aux = state.licitaciones.concat(data);
        state.licitaciones = aux;
        socketApi.sendNotification();
    })
});

socketApi.sendNotification = () => {
    io.sockets.emit('licitaciones',state.licitaciones);
}

socketApi.sendNotificationAceptado = () => {
    io.sockets.emit('licitaciones-aceptado',state.licitaciones);
}

module.exports = socketApi;