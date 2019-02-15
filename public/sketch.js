var socket;
var players;
var playerL = false;
var keys;
var localSocketId = ''

function setup() {
  createCanvas(500, 500);
  background(182);

  socket = io.connect('http://localhost:3000');

  socket.on('initPlayer', initPlayer)
  socket.on('playerInfo', recPlayerInfo)

  players = {};
  keys = [87, 65, 83, 68, 16];
}

// window.onbeforeunload = function () {
//   return socket.emit('dc', { id: localSocketId });
// };

function dcEvent() {
  socket.emit('dc', { id: localSocketId })
}

function initPlayer(data){
  localSocketId = data.id
  playerL = new Player(localSocketId);
  playerL.sendInfo();
  players[localSocketId] = playerL;
  // print('hi')
}

function recPlayerInfo(data){
  players = {};
  for (var player in data){
    players[player] = new Player(data.id);
    players[player].getInfo(data[player]);
  }
}

function reqPlayerInfo(){
  socket.emit('reqPlayerInfo')
}

function draw() {
  if (playerL){
    for(var i = 0; i < keys.length; i++){
      if(keyIsDown(keys[i])){
        var data = {
          pressed: keys[i],
          id: localSocketId
        }
        socket.emit('key', data);
      }
    }
    background(186);
    reqPlayerInfo();
    for (var player in players){
      players[player].draw();
    }
  }
}