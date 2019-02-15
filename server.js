var express = require('express');
var app = express();

var server = app.listen('3000');
app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

var players = {};

function newConnection(socket){
    socket.on('key', keyHandle);
    socket.on('playerData', getPlayerData);
    socket.on('reqPlayerInfo', sendPlayerData);
    socket.on('dc', playerDC);
    socket.emit('initPlayer', {id: socket.id});
    // console.log(players);
    // console.log(socket.id);
}

function playerDC(data){
    // console.log(data);
    removeId = data.id;
    // console.log(players.removeId);
    delete(players[removeId]);
    // console.log(players.removeId);
    // console.log(playerIDs);
}

function sendPlayerData(){
    data = players;
    // delete(data.id);
    io.emit('playerInfo', data);
}

function getPlayerData(data) {
    players[data.id] = { x: data.x, y: data.y, id: data.id };
}

function keyHandle(dataR){
    toUpdateId = dataR.id;
    // console.log(dataR)
    data = {
        x: 0,
        y: 0,
    };
    switch(dataR.pressed){
        case 87:
            data = {
                x: 0,
                y: -2,
            };
            break;
        case 65:
            data = {
                x: -2,
                y: 0,
            };
            break;
        case 83:
            data = {
                x: 0,
                y: 2,
            };
            break;
        case 68:
            data = {
                x: 2,
                y: 0,
            };
            break;
        case 16:
            data = {

            };
    }
    // socket.broadcast.to(dataR.id).emit('key', data);
    // io.sockets.socket(dataR.id).emit('key', data);
    // io.to(dataR.id).emit('key', data);
    // console.log(players);
    // console.log(toUpdateId);
    // console.log(players.toUpdateId);
    players[toUpdateId].x += data.x;
    players[toUpdateId].y += data.y;
}


