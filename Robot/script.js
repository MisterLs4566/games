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
        this.mobile = false
        this.spikes = []
        this.x = 0
        this.mouse = false
        alert(navigator.userAgent)
        if(/Android|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(navigator.userAgent)) 
        {
            this.mobile = true
        }
    }
    clear(){
        this.c.clearRect(0, 0, this.width, this.height);
    }
    keys(event){
        if (event.key == " ")
        {
            if (this.player.y == this.player.pos_y)
        {
            this.player.image.src = "sprites/jump.png"
            this.player.jump = true
        }
        } 
        if (event.key == "r")
        {
            this.player.image.src = this.player.static
            this.player.x = this.player.pos_x;
            this.player.y = this.player.pos_y;
            this.ground.x = this.ground.pos_x
            this.ground.y = this.ground.pos_y
        }
    }
    mouse_(event){
        if (this.player.y == this.player.pos_y)
        {
            this.player.image.src = "sprites/jump.png"
            this.player.jump = true
        }
    }
    draw(event){
        this.c.drawImage(this.ground.image, this.ground.x, this.ground.y, this.ground.scalex, this.ground.scaley);
        this.c.drawImage(this.ground.image, this.ground.ground.x, this.ground.ground.y, this.ground.ground.scalex, this.ground.ground.scaley);
        this.c.drawImage(this.player.image, this.player.x, this.player.y, this.player.scale, this.player.scale);
        if (this.spikes.length>0)
        {
            for (var x=0; x<this.spikes.length; x++)
            {
                this.c.drawImage(this.spikes[x].image, this.spikes[x].x, this.spikes[x].y, this.spikes[x].scalex, this.spikes[x].scaley);
            }
        }
    }
    spikes_(){
        this.x = Math.floor(Math.random()*1000)
        if (this.x == 10)
        {
            this.spike = new Spike("sprites/spike.PNG", this.width+50, this.height-(parseInt(this.height/2)), parseInt(this.height/3));
            console.log(this.spike)
            this.spikes.push(this.spike);
            this.spike.number = this.spikes.length-1;
            console.log("sprites: ", this.spikes)
        }
    }
    update(){    
        const canvas = document.getElementById("canvas");
        this.canvas = canvas
        this.clear();
        this.draw();
        this.player.update();
        this.ground.update();
        this.ground.ground.update();
        this.spikes_();
        if (this.spikes.length>0)
        {
            for (var x=0; x<this.spikes.length; x++)
            {
                this.spikes[x].update()
            }
        }
    }
}
class Player{
    constructor(image, pos_x, pos_y, scale,){
        this.static = image
        this.move1 = "sprites/move1.png"
        this.move2 = "sprites/move2.png"
        this.jump = "sprites/jump.png"
        this.image = document.createElement("img");
        this.image.src = this.static;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.x = pos_x;
        this.y = pos_y;
        this.scale = scale;
        this.jump = false
        this.move = true
        this.move_list = [this.static, this.move1, this.move2]
        this.img_counter = 0
    }
    jump_(){
        if (this.jump == true)
            if (this.y > this.pos_y -140)
            {
                this.move = false
                this.y -= 20;
            }
            else
            {
                this.jump = false
            }
    }
    gravity(){
        if (this.y < this.pos_y){
            if (this.jump == false)
            {
                this.move = false
                this.y += 7;
            }
        }
        else
        {
            if (this.jump == false)
            {
                if (this.move == false)
                {
                    this.move = true
                    this.img_counter = 0
                    this.image.src = this.static;
                }
            }
        }
    }
    update(){
        this.gravity();
        this.jump_();
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
        this.speed = 10
        this.instantiate = false
    }
    update(){
        if (this.type == 1)
        {
            this.ground.x = this.x+this.scalex-20
            this.x -= this.speed;
            if (game.mobile == false)
            {
                if (game.player.move == true)
                {
                    game.player.img_counter+=0.1
                    if (game.player.img_counter >= game.player.move_list.length)
                    {
                        game.player.img_counter = 0
                    }
                    if (parseInt(game.player.img_counter) != game.player.img_counter)
                    {
                        if (game.player.image.complete)
                        {
                            game.player.image.src = game.player.move_list[parseInt(game.player.img_counter)];
                        }   
                }   }
            }

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
        this.image = document.createElement("img");
        this.image.src = image;
        this.x = pos_x
        this.y = pos_y
        this.pos_x = pos_x
        this.pos_y = pos_y
        this.scalex = scalex
        this.scaley = scaley
        this.speed = 10
    }
    update(){
        if (this.x >= game.width-this.scalex)
        {
            this.x--;
        }
        else
        {
            game.spikes.splice(this.number)
            console.log("destroy")
            delete this;
        }
    }
}
game = new Game();
document.addEventListener("keypress", function(){game.keys(event)});
var interval = setInterval(function(){game.update()}, 16);