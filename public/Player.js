function Player(id){
    this.pos = createVector(width/2, height/2);
    this.id = id;

    this.sendInfo = function(){
        data = {
            x: this.pos.x,
            y: this.pos.y,
            id: this.id
        }
        // print(data);
        socket.emit('playerData', data);
    }

    this.getInfo = function(data){
        this.pos.x = data.x;
        this.pos.y = data.y;
        this.id = data.id;
    }

    this.draw = function(){
        fill(82);
        rect(this.pos.x - 5, this.pos.y - 5, 10, 10);
    }
}