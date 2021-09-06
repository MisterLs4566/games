class Game{
    constructor(){
        const canvas = document.getElementById("canvas");
        const c = canvas.getContext("2d");
        this.canvas = canvas
        this.c = c
        this.c.fillStyle = "black";
        this.c.lineWidth = 1;
	    this.c.strokeStyle = "#000000";
        this.c.imageSmoothingEnabled = false;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ground = new Ground("sprites/ground1.PNG", 0, this.height-parseInt(this.width/2.19), this.width, parseInt(this.width/2), 1);
        this.ground.ground = new Ground("sprites/ground1.PNG", this.ground.pos_x+this.ground.scalex, this.ground.pos_y, this.ground.scalex, this.ground.scaley, 2)
        this.player = new Player("sprites/static.png", 10, this.height-(parseInt(this.height/1.75)), parseInt(this.height/3));
    }
    clear(){
        this.c.clearRect(0, 0, this.width, this.height);
    }
    keys(event){
        if (event.key == " ")
        {
            this.player.jump();
        } 
        if (event.key == "r")
        {
            this.player.x = this.player.pos_x;
            this.player.y = this.player.pos_y;
            this.ground.x = this.ground.pos_x
            this.ground.y = this.ground.pos_y
        }
    }
    mouse(event){
        this.player.jump()
    }
    draw(event){
        this.ground.image.onload = this.c.drawImage(this.ground.image, this.ground.x, this.ground.y, this.ground.scalex, this.ground.scaley);
        this.ground.ground.image.onload = this.c.drawImage(this.ground.image, this.ground.ground.x, this.ground.ground.y, this.ground.ground.scalex, this.ground.ground.scaley);
        this.player.image.onload = this.c.drawImage(this.player.image, this.player.x, this.player.y, this.player.scale, this.player.scale);
    }
    update(){
        this.clear();
        this.draw();
        this.player.update();
        this.ground.update();
        this.ground.ground.update();
    }
}
class Player{
    constructor(image, pos_x, pos_y, scale,){
        this.image = new Image();
        this.image.src = image;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.x = pos_x;
        this.y = pos_y;
        this.scale = scale;
    }
    jump(){
        if (this.y == this.pos_y)
        {
            this.y -= 140;
        }
    }
    gravity(){
        if (this.y < this.pos_y){
            this.y += 7;
        }
    }
    update(){
        this.gravity();
    }
}
class Ground{
    constructor(image, pos_x, pos_y, scalex, scaley, type){
        this.image = new Image();
        this.image.src = image;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.x = pos_x;
        this.y = pos_y;
        this.scalex = scalex;
        this.scaley = scaley
        this.type = type
    }
    update(){
        if (this.type == 1)
        {
            this.ground.x = this.x+this.scalex-20
            this.x -= 10;
        }
        if (this.type == 2)
        {
            if (this.x <= 0)
            {
                game.ground.x = this.x
            }
        }
    }
}
class Spike{
    constructor(image, pos_x, pos_y, scalex, scaley){
        this.image = new Image();
        this.image.src = image;
        this.pos_x = pos_x
        this.pos_y = pos_y
        this.scalex = scalex
        this.scaley = scaley
    }
}
game = new Game();
document.addEventListener("keypress", function(){game.keys(event)});
document.addEventListener("mousedown", function(){game.mouse(event)});

var interval = setInterval(function(){game.update()}, 17);
