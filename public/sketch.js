var socket;

function setup() {
  createCanvas(500, 500);
  background(182);

  socket = io.connect('http://localhost:3000');

  socket.on('key', newTxt);
}

function newTxt(data){
  background(182);
  text(data.pressed, 100, 100);
}

function keyPressed(){
  var data = {
    pressed: key
  }
  socket.emit('key', data);
}

function draw() {

}