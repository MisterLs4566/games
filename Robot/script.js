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
        this.state = 1;
        this.ground = new Ground("sprites/ground1.PNG", 0, this.height-parseInt(this.width/2.19), this.width, parseInt(this.width/2), 1);
        this.ground.ground = new Ground("sprites/ground1.PNG", this.ground.pos_x+this.ground.scalex, this.ground.pos_y, this.ground.scalex, this.ground.scaley, 2);
        this.player = new Player("sprites/static.png", 10, this.height-(parseInt(this.height/1.75)), parseInt(this.height/3));
        this.mobile = false;
        this.x = 0;
        this.mouse = false;
        this.spike = new Spike("sprites/spike.PNG", this.width, this.player.y+60, parseInt(this.height/6), parseInt(this.height/6), true);
        this.spikes = [this.spike];
        this.pressed = false;
        this.start = false;
        this.spike_time = 50;
        this.factor = 2;
        this.coins = 0;
        if(/Android|iPhone|iPod|BlackBerry|Opera Mini/i.test(navigator.userAgent)) 
        {
            this.mobile = true;
        }
        //Ipad
        if (navigator.userAgent == "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15")
        {
            this.mobile = true;
        }
        if (this.mobile == false)
        {
            this.frequence = 16;
        }
        else
        {
            this.frequence = 32;
            this.spike.speed = parseInt(this.spike.speed*this.factor);
            this.spike.speed_d = parseInt(this.spike.speed_d * this.factor);
            this.spike.speed_s = parseInt(this.spike.speed_s * this.factor);
            this.player.grav = parseInt(this.player.grav*this.factor);
            this.player.jump_speed = parseInt(this.player.jump_speed*this.factor)-10;
            this.ground.speed = parseInt(this.ground.speed*this.factor);
            this.ground.old_speed = parseInt(this.ground.old_speed*this.factor);
            this.spike.old_speed = parseInt(this.spike.old_speed*this.factor);
        }
    }
    clear(){
        this.c.clearRect(0, 0, this.width, this.height);
    }
    draw(event){
        this.c.drawImage(this.ground.image, this.ground.x, this.ground.y, this.ground.scalex, this.ground.scaley);
        this.c.drawImage(this.ground.image, this.ground.ground.x, this.ground.ground.y, this.ground.ground.scalex, this.ground.ground.scaley);
        this.c.drawImage(this.player.image, this.player.x, this.player.y, this.player.scale, this.player.scale);
        this.c.drawImage(this.spike.image, this.spike.x, this.spike.y, this.spike.scalex, this.spike.scaley);
        this.c.font = "40px Times New Roman";
        this.c.fillStyle = "white";
        this.c.textAlign = "center";
        this.c.fillText(this.coins, parseInt(this.width/2), 40);
    }
    spikes_(){
        this.s_t = true;
        for (var x=0; x<this.spikes.length; x++)
        {
            if (this.spikes[x].instantiate == true)
            {
                if (this.spikes[x].time < this.spike_time)
                {
                    this.s_t = false;
                }
            }

        }
        if (this.s_t == true)
        {
            this.created = false;
            for (var x=0; x<this.spikes.length; x++)
            {
                if (this.created == false)
                {
                    if(this.spikes[x].time == 0)
                    {
                        this.spikes[x].instantiate = true;
                        this.spikes[x].speed = parseInt(this.spikes[x].speed_s + Math.random()*this.spikes[x].speed_d)
                        this.created = true
                    }
                }
            }
        }
    }
    update(){
        if (this.start == true)
        {
            this.coins+=1;
        }    
        const canvas = document.getElementById("canvas");
        const c = canvas.getContext("2d");
        this.c = c;
        this.canvas = canvas
        this.clear();
        this.draw();
        this.player.update();
        this.ground.update();
        this.ground.ground.update();
        if (this.start == true)
        {
            this.spikes_();
        }
        this.spike.update()
    }
    keys(event){
        if (this.state == 1)
        {
            this.interval = setInterval(function(){game.update()}, game.frequence);
            canvas.style = "background-color: rgb(0, 162, 255)";
            this.ground.speed = this.ground.old_speed;
            this.ground.image_speed = this.ground.old_image_speed;
            this.spike.speed_d = 0;
            this.spike.speed = this.spike.speed_s;
            this.coins = 0;
            this.state = 2;
        }
        else if (this.state == 2)
        {
            if (event.key == " ")
            {
                if (this.pressed == false)
                {
                    if (this.player.y == this.player.pos_y)
                    {
                        if (this.player.image.src != this.player.jump)
                        {
                            this.player.scaley = parseInt(this.player.scaley/1.5)
                            this.player.image.src = "sprites/jump.png"
                            this.player.jump = true
                            this.pressed = true
                        }
                    }
                }
            } 
        }
    }
    key_up(event)
    {
        if (this.state == 2)
        {
            this.pressed = false
        }
    }
    mouse_(event){
        if (this.state == 1)
        {
            this.interval = setInterval(function(){game.update()}, game.frequence);
            canvas.style = "background-color: rgb(0, 162, 255)";
            this.ground.speed = this.ground.old_speed;
            this.ground.image_speed = this.ground.old_image_speed;
            this.spike.speed_d = 0;
            this.spike.speed = this.spike.speed_s;
            this.coins = 0;
            this.state = 2;
        }
        else if (this.state == 2)
        {
            if (this.player.y == this.player.pos_y)
            {
                if (this.player.image.src != this.player.jump)
                {
                    this.player.scaley = parseInt(this.player.scaley/1.5) 
                    this.player.image.src = "sprites/jump.png"
                    this.player.jump = true
                }
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
        this.scalex = scale;
        this.scaley = scale;
        this.old_scaley = scale;
        this.jump = false;
        this.move = true;
        this.move_list = [this.static, this.move1, this.move2];
        this.img_counter = 0;
        this.grav = 10;
        this.jump_speed = 15;
    }
    jump_(){
        if (this.jump == true)
            if (this.y > this.pos_y -150)
            {
                this.move = false
                this.y -= this.jump_speed;
            }
            else
            {
                this.jump = false
                if (game.start == false)
                {
                    game.start = true
                }
            }
    }
    gravity(){
        if (this.y < this.pos_y){
            if (this.jump == false)
            {
                this.move = false
                this.y += this.grav;
            }
        }
        else
        {
            if (this.jump == false)
            {
                if (this.move == false)
                {
                    this.scaley = this.old_scaley
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
        this.type = type;
        this.speed = 10;
        this.old_speed = 10;
        this.instantiate = false;
        this.image_speed = 0.1;
        this.old_image_speed = 0.1;
    }
    update(){
        if (this.type == 1)
        {
            this.ground.x = parseInt(this.x+this.scalex-20)
            this.x -= parseInt(this.speed);
            if (game.mobile == false)
            {
                if (game.player.move == true)
                {
                    game.player.img_counter+=this.image_speed
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
    constructor(image, pos_x, pos_y, scalex, scaley, inst){
        this.image = document.createElement("img");
        this.image.src = image;
        this.x = pos_x;
        this.y = pos_y;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.scalex = scalex;
        this.scaley = scaley;
        this.speed_s = 20;
        this.speed_d = 0;
        this.speed = 20;
        this.time = 0;
        this.instantiate = inst;
    }
    collision(){
        if (game.player.x+game.player.scalex-20>this.x)
        {
            if (game.player.y+game.player.scaley-30>this.y)
            {
                game.clear();
                const canvas = document.getElementById("canvas");
                const c = canvas.getContext("2d");
                game.c = c;
                game.canvas = canvas;
                this.time = 0;
                game.start = false;
                game.canvas.style = "background-color: rgba(0, 120, 218, 0.452)";
                game.c.font = "40px Times New Roman";
                game.c.fillStyle = "white";
                game.c.textAlign = "center";
                game.c.fillText("Game Over", parseInt(game.width/2), parseInt(game.height/2-50));
                game.c.fillText(game.coins+" points", parseInt(game.width/2), parseInt(game.height/2+50));
                game.player.x = game.player.pos_x;
                game.player.y = game.player.pos_y;
                game.ground.x = game.ground.pos_x;
                this.x = this.pos_x;
                this.clear = clearInterval(game.interval);
                game.state = 1;
            }  
        }
    }
    update(){
        if (this.instantiate == true)
        {
            this.collision();
            if (this.x > 0-this.scalex)
            {
                if (game.start == true)
                {
                    this.time += 1;
                    this.x-= this.speed;
                } 
            }
            else
            {
                if (this.speed_d < 20)
                {
                    this.speed_d += 0.5;
                    game.ground.speed += 0.3; 
                    game.ground.image_speed += 0.02;
                }
                this.instantiate = false;
                this.y = this.pos_y;
                this.x = this.pos_x;
                this.time = 0;
            }
        } 
    }
}
game = new Game();
document.addEventListener("keypress", function(){game.keys(event)});
document.addEventListener("keyup", function(){game.key_up(event)});