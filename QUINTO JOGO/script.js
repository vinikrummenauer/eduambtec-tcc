var canvas = document.getElementById('canvas').getContext("2d");
canvas.imageSmoothingEnabled = false;

document.addEventListener("click", function(e){
    if(currentScene.click){
        currentScene.click();
    }
});

document.addEventListener("mousemove", function(e){
    if (currentScene.moveShip){
        currentScene.moveShip(e);
    }
});

var currentScene = {};
function changeScene (scene){
    currentScene = scene;
}

var bullets = 10;
var pts2 = 0;
var pts = 0;
var diffText = "fácil";

var groupShoot = [];
var shoots = {
    draw(){
        groupShoot.forEach(shoot => {
            shoot.draw();
        });
    },

    update(){
        
        groupShoot.forEach(shoot => {
            shoot.move();
            if(shoot.y <= -100){
                groupShoot.splice(shoot[0], 1)
            }
        });
    },
}

var groupMeteors = [];
var meteors = {

    time: 0,
    spawnMeteors(){
        this.time += 0.4;

        size = Math.random() * (40 - 30) + 50;
        posx = Math.random() * (450 - 10) + 10;
        size2 = Math.random() * (40 - 40) + 40;
        posx2 = Math.random() * (450 - 10) + 5;
        size3 = Math.random() * (50 - 50) + 40;
        posx3 = Math.random() * (450 - 10) + 20;

        if(this.time >= 60){
            groupMeteors.push(new Meteors(posx, -100, size, size, "assets/lixo.png"));
            groupMeteors.push(new Meteors(posx2, -100, size2, size2, "assets/latinha.png"));
            groupMeteors.push(new Meteors(posx3, -100, size3, size3, "assets/copo.png"));
        }

        if (pts >= 15 && pts < 30){
            if(this.time >= 30){
                this.time = 0;
                groupMeteors.push(new Meteors(posx, -100, size, size, "assets/lixo.png"));
                groupMeteors.push(new Meteors(posx2, -100, size2, size2, "assets/latinha.png"));
                groupMeteors.push(new Meteors(posx3, -100, size3, size3, "assets/copo.png"));
            }
        }

        if (pts >= 30 && pts < 60){
            if(this.time >= 40){
                this.time = 0;
                groupMeteors.push(new Meteors(posx, -100, size, size, "assets/lixo.png"));
                groupMeteors.push(new Meteors(posx2, -100, size2, size2, "assets/latinha.png"));
                groupMeteors.push(new Meteors(posx3, -100, size3, size3, "assets/copo.png"));
                groupMeteors.push(new Meteors(posx3, -100, size3, size3, "assets/copo.png"));
            }
        }

        if (pts >= 60 && pts < 80){
            if(this.time >= 45){
                this.time = 0;
                groupMeteors.push(new Meteors(posx, -100, size, size, "assets/lixo.png"));
                groupMeteors.push(new Meteors(posx2, -100, size2, size2, "assets/latinha.png"));
                groupMeteors.push(new Meteors(posx3, -100, size3, size3, "assets/copo.png"));
                groupMeteors.push(new Meteors(posx3, -100, size3, size3, "assets/copo.png"));
                groupMeteors.push(new Meteors(posx, -100, size, size, "assets/lixo.png"));
                groupMeteors.push(new Meteors(posx2, -100, size2, size2, "assets/latinha.png"));
            }
        }


        if (pts >= 100){
            if(this.time >= 45){
                this.time = 0;
                groupMeteors.push(new Meteors(posx, -100, size, size, "assets/lixo.png"));
                groupMeteors.push(new Meteors(posx2, -100, size2, size2, "assets/latinha.png"));
                groupMeteors.push(new Meteors(posx3, -100, size3, size3, "assets/copo.png"));
                groupMeteors.push(new Meteors(posx3, -100, size3, size3, "assets/copo.png"));
                groupMeteors.push(new Meteors(posx, -100, size, size, "assets/lixo.png"));
                groupMeteors.push(new Meteors(posx2, -100, size2, size2, "assets/latinha.png"));
                groupMeteors.push(new Meteors(posx, -100, size, size, "assets/lixo.png"));
                groupMeteors.push(new Meteors(posx2, -100, size2, size2, "assets/latinha.png"));
                groupMeteors.push(new Meteors(posx3, -100, size3, size3, "assets/copo.png"));
            }
        }

        if(this.time >= 60){
        this.time = 0;
        }
        
    },

    destroyMeteors(){
        groupShoot.forEach((shoot) => {
          groupMeteors.forEach((meteors) => {
            if (shoot.collide(meteors)) {
              groupShoot.splice(groupShoot.indexOf(shoot), 1);
              groupMeteors.splice(groupMeteors.indexOf(meteors), 1);
              bullets += 2;
              pts += 1;
            }
          });
        });
      },

    draw(){
        groupMeteors.forEach(m => {
            m.draw();
        });
    },

    update(){
        this.spawnMeteors();
        this.destroyMeteors();
        groupMeteors.forEach(m => {
            m.move();
            if(m.y > 750){
                pts2 += 1;
                groupMeteors.splice(groupMeteors.indexOf(m), 1);
                if(pts2 === 3){
                changeScene(gameover);
                }
            }
        });
    },
}

var infinityBg = {
    bg: new Obj(0,0, 600,900, "assets/fundo.png"),
    bg2: new Obj(0,-900,600,900, "assets/fundo.png"),

    draw(){
        this.bg.draw();
        this.bg2.draw();
    },

    moveBg(){
        this.bg.y += 1;
        this.bg2.y +=1;

        if (this.bg.y >= 900){
            this.bg.y = 0;
        }
        if (this.bg2.y >= 0){
            this.bg2.y = -900;
        }
    },
}

var infinityBg2 = {
    bg: new Obj(0,0,600,900, "assets/fundo2.png"),
    bg2: new Obj(0,-900,600,900, "assets/fundo2.png"),

    draw(){
        this.bg.draw();
        this.bg2.draw();
    },

    moveBg(){
        this.bg.y += 0.5;
        this.bg2.y +=0.5;

        if (this.bg.y >= 900){
            this.bg.y = 0;
        }
        if (this.bg2.y >= 0){
            this.bg2.y = -900;
        }
    },
}

var menu = {
    clique: new Obj(40, 100, 530, 700, "assets/clique.png"),
    ship: new Obj(270, 680, 60, 50, "assets/nave.png"),
    terra: new Obj(-50, 700, 690, 690, "assets/terra.png"),

    click(){
        changeScene(game);
    },
    draw(){
        infinityBg.draw();
        this.clique.draw();
        this.terra.draw();
        this.ship.draw();
    },
    update(){
        infinityBg.moveBg();
    },
}

var game = {

    score: new Text(`Pontos: ${pts}`),
    diff: new Text("Nível:"),
    text: new Text(""),
    ship: new Obj(270, 680, 60, 50, "assets/nave.png"),
    terra: new Obj(-50, 700, 690, 690, "assets/terra.png"),
    bala : new Obj(-10, 760, 60, 50, "assets/Bala.png"),
    coracao3: new Obj(15, -50, 175, 175, "assets/3coracao.png"),
    coracao2: new Obj(15, -50, 175, 175, "assets/2coracao.png"),
    coracao1: new Obj(15, -50, 175, 175, "assets/1coracao.png"),

    click(){
        if(bullets > 0){
            bullets -= 1;
            groupShoot.push(new Shoot(this.ship.x + this.ship.width / 2,this.ship.y,2,10, "assets/tiro.png"));
        }
    },

    moveShip(event){
        this.ship.x = event.offsetX - this.ship.width / 2;
        this.ship.y = event.offsetY - 30;
    },

    draw(){
        infinityBg.draw();
        this.score.draw_text(25, "OCR A", 40, 100, "white");
        this.diff.draw_text(25, "OCR A", 350, 40, "white");
        this.text.draw_text(25, "OCR A", 40, 800, "white");
        this.terra.draw();
        this.ship.draw();
        this.bala.draw()
        shoots.draw();
        meteors.draw();
        if(pts2 === 0){
            this.coracao3.draw();
        } else if(pts2 === 1){
            this.coracao2.draw();
        } else if(pts2 === 2){
            this.coracao1.draw();
        }
        

    },
    update(){
        infinityBg.moveBg();
        shoots.update();
        meteors.update();
        this.score.update_text(`Pontos: ${pts}`);
        this.text.update_text(`${bullets}`);
        this.diff.update_text("Nível: "+ diffText);
        if(pts === 0){
            diffText = "fácil";
        }
        else if(pts === 15){
            diffText = "médio";
        }
        else if(pts === 30){
            diffText = "difícil";
        }
    },
}

var gameover = {
    score: new Text("0"),
    clique2: new Obj(40, 100, 530, 700, "assets/clique2.png"),
    terra: new Obj(-50, 700, 690, 690, "assets/terra2.png"),
    
    


    draw(){
        infinityBg2.draw();
        this.clique2.draw()
        this.terra.draw();
        this.score.draw_text(25, "OCR A", 88, 500, "white");
    },

    update(){
        infinityBg2.moveBg();
        this.score.update_text("Você fez um total de "+pts+" pontos");
    },

    cleanScene(){
        pts2 = 0;
        pts = 0;
        diffText = "fácil";
        bullets = 10;
        groupMeteors = [];
        groupShoot = [];
    },

    click(){
        this.cleanScene();
        changeScene(menu);
    }
}

function main(){
    canvas.clearRect(0,0,500,900);
    currentScene.draw();
    currentScene.update();
    requestAnimationFrame(main);
}

changeScene(menu);
main();