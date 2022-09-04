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

var bullets = 200;

var pts = 0;

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
        this.time += 0.5;

        size = Math.random() * (40 - 30) + 50;
        posx = Math.random() * (450 - 10) + 10;
        size2 = Math.random() * (40 - 40) + 40;
        posx2 = Math.random() * (450 - 10) + 5;
        size3 = Math.random() * (50 - 50) + 40;
        posx3 = Math.random() * (450 - 10) + 20;

        if(this.time >= 60){
            this.time = 0;
            groupMeteors.push(new Meteors(posx, -100, size, size, "assets/lixo.png"));
            groupMeteors.push(new Meteors(posx2, -100, size2, size2, "assets/latinha.png"));
            groupMeteors.push(new Meteors(posx3, -100, size3, size3, "assets/copo.png"));
        }
    },

    destroyMeteors(){
        groupShoot.forEach((shoot) => {
          groupMeteors.forEach((meteors) => {
            if (shoot.collide(meteors)) {
              groupShoot.splice(groupShoot.indexOf(shoot), 1);
              groupMeteors.splice(groupMeteors.indexOf(meteors), 1);
              bullets + 10;
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
                groupMeteors.splice(groupMeteors.indexOf(m), 1);
                changeScene(gameover);
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
    /*title: new Text("SALVE O MUNDO"),
    label: new Text("Clique para jogar"),*/
    ship: new Obj(270, 680, 60, 50, "assets/nave.png"),
    terra: new Obj(-50, 700, 690, 690, "assets/terra.png"),

    click(){
        changeScene(game);
    },
    draw(){
        infinityBg.draw();
        this.clique.draw();
        /*this.title.draw_text(50, "OCR A", 65, 330, 'white');
        this.label.draw_text(20, "OCR A", 160, 400, "white");*/
        this.terra.draw();
        this.ship.draw();
    },
    update(){
        infinityBg.moveBg();
    },
}

var game = {

    score: new Text("0"),
    ship: new Obj(270, 680, 60, 50, "assets/nave.png"),
    terra: new Obj(-50, 700, 690, 690, "assets/terra.png"),

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
        this.score.draw_text(30, "OCR A", 40, 40, "white");
        this.terra.draw();
        this.ship.draw();
        shoots.draw();
        meteors.draw();
    },
    update(){
        infinityBg.moveBg();
        shoots.update();
        meteors.update();
        this.score.update_text(pts);
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
        pts = 0;
        bullets = 200;
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