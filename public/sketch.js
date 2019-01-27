var socket;

function setup() {
  createCanvas(500, 500);
  background(182);

  socket = io.connect('http://localhost:3000')
}

function draw() {

}