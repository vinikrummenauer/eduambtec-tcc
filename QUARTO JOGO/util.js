class Obj{

    frame = 0;
    timer = 0;
    set_visible = true;

    constructor(x,y,width,height, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }


    draw(){
        if(this.set_visible){
            var img = new Image();
            img.src = this.image;
            canvas.drawImage(img, this.x, this.y, this.width, this.height);
    }
        }

    animation(vel, limit, nome){
        this.timer += 1;
        if(this.timer >= vel){
            this.timer = 0;
            this.frame += 1;
        }
        if(this.frame >= limit){
        this.frame = 0;
        }
        this.image = "assets/images/" + nome + this.frame + ".png"
    }

    collide(obj){
        if(this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y)
            {
                return true;
        }else{
            return false;
        }
     }
}


        class Text{
        text = " ";

        constructor(text){
        this.text = text;
        }

    draw_text(size, font, x, y){
        canvas.font = size + "px" + " " + font;
        canvas.fillStyle = "black";
        canvas.fillText(this.text, x, y);
    }
    
    update_text(valor){
        this.text = valor;
    }
}


class Bg extends Obj{
    move(speed, limit, pos){
        this.x -= speed;
        if(this.x <= limit){
            this.x = pos
        }
    }
}

class Ground extends Bg{

}

class Bird extends Obj{
    vel = 2;
    grav = 1;

    move(){
        if(this.vel <10){
            this.vel += this.grav;
        }
        this.y += this.vel;
    }

    limits(){
        if(this.y >=640){
            this.y = 640;
        }
        else if(this.y <=0){
            this.y = 0;
        }
    }
}

class Pipe extends Obj{
    move(vel, limit, new_pos, pipe2){
        this.x -= vel;
        if(this.x <= limit){
            this.x = new_pos;
            this.y = Math.random() * (600 - 400) + 400;
        }
        pipe2.x = this.x;
        pipe2.y = this.y - 600;
    }
}

class Coin extends Obj{

    
}

class Shoot extends Obj{
    move(){
        this.y += 10;
        this.x -= 4;
        this.x += 1;
    }
}
