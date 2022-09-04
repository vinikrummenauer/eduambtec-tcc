var canvas = document.getElementById('canvas').getContext("2d");
canvas.imageSmoothingEnabled = false;

document.addEventListener("click", function(e){
    if(currentScene.click){
        currentScene.click();
    }
});

var currentScene = {};
function changeScene (scene){
    currentScene = scene;
}

document.addEventListener("keyup", function(evento){
    let tecla2 = event.keyCode;
    if(tecla2==40){
        if(pts > 0){
            pts -= 1;
            groupShoot.push(new Shoot(bird.x + bird.width / bird.x+30,bird.y+30,50,50, "assets/images/saco.png"));
            groupArmazenado.splice(groupArmazenado.indexOf(armazenado), 1);
        }
    }
});

var pts = 0;

var pipe1 = new Pipe(600, 500, 96, 358, "assets/images/pipe1.png");
var pipe2 = new Pipe(600, -500, 96, 358, "assets/images/pipe2.png");
var pipe3 = new Pipe(1032, 450, 96, 358, "assets/images/pipe2.png");
var pipe4 = new Pipe(1642, 400, 96, 358, "assets/images/pipe3.png");
var bird = new Bird(100, 400, 90, 80, "assets/images/bird0.png");

var coin = {

    time: 0,
    spawnCoin(){
        this.time += 0.5;

        //posicao vai ir até 400y
        posy = Math.random() * (50 - 400) + 10;
        posy2 = Math.random() * (50 - 400) + 5;
        posy3 = Math.random() * (50 - 400) + 20;

        if(this.time >= 60){
            this.time = 0;
            groupArmazenado.push(new Coin(200, 400, 50, 50, "assets/images/lixo.png"));
        }
        console.log(this.time)
    },

    draw(){
        groupArmazenado.forEach(c => {
            c.draw();
        });
    },
}

var groupArmazenado = [];
var armazenado = {
    draw(){
        groupArmazenado.forEach(armazenado => {
            armazenado.draw()
        })
    }
}

var score = 0;
var score_text = new Text();

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

            if(shoot.y >= 650){
                groupShoot.splice(shoot[0], 1)
            }
        });
    },

}


var infinityBg = {
    bg: new Obj(-1,0,1500,900, "assets/images/sky.png"),
    bg2: new Obj(1,0,1500,900, "assets/images/sky.png"),

    draw(){
        this.bg.draw();
        this.bg2.draw();
    },

    moveBg(){
        this.bg.x += 1;
        this.bg2.x +=1;

        if (this.bg.x >= 1500){
            this.bg.x = 0;
        }
        if (this.bg2.x >= 0){
            this.bg2.x = -1500;
        }
    },
}

var infinityGround = {
    ground: new Ground(0,700, 1500, 200, "assets/images/ground.png"),
    ground2: new Ground(500,700, 1500, 200, "assets/images/ground.png"),

    draw(){
        this.ground.draw();
        this.ground2.draw();
    },

    moveBg(){
        this.ground.x -= 5;
        this.ground2.x -= 5;

        if (this.ground.x <= -500){
            this.ground.x = 0;
        }
        if (this.ground2.x <= 0){
            this.ground2.x = 500;
        }
    },
}


var menu = {
    /*title: new Text("VOA VOA"),
    label: new Text("Clique para jogar"),*/
    clique1: new Obj(430, 200, 500, 500, "assets/images/clique1.png"),

    click(){
        changeScene(game);
    },

    draw(){
        infinityBg.draw();
        bird.draw();
        this.clique1.draw()
        /*this.title.draw_text(60, "Arial", 555, 300, "white");
        this.label.draw_text(20, "Arial", 620, 400, "white");*/
    },

    update(){
        infinityBg.moveBg();
    }

}

var game = {

    draw(){
        infinityBg.draw();
        armazenado.draw();
        pipe1.draw();
        pipe3.draw();
        pipe4.draw();
        infinityGround.draw();
        bird.draw();
        shoots.draw();
        coin.draw();
        score_text.draw_text(60, "OCR A", 50, 100);
    },

    update(){
        infinityGround.moveBg();
        infinityBg.moveBg();
        
        bird.move();
        bird.animation(18, 3, "bird");
        bird.limits();
        
        pipe1.move(5, -100, 1500, pipe2);
        pipe3.move(5, -100, 1500, pipe2);
        pipe4.move(5, -100, 1500, pipe2);
        
        coin.spawnCoin();

        shoots.update();

        score_text.text = score;

        colision();
    }
}

var gameover = {
    score: new Text("0"),
    clique2: new Obj(430, 200, 500, 500, "assets/images/clique2.png"),


    draw(){
        infinityBg.draw();
        this.score.draw_text(30, "OCR A", 400, 600);
        this.clique2.draw();
    },

    update(){
        infinityBg.moveBg();
        this.score.update_text("Você fez um total de "+score+" pontos");
    },

    click(){
        changeScene(menu);
        score = 0;
        bullets = 200;
        groupMeteors = [];
        groupShoot = [];
    }

}


document.addEventListener("keydown", function(evento){
    let tecla = event.keyCode;
    if(tecla==38){
    bird.vel -= 15;
    }
});

function colision(){
    if(bird.collide(coin)){
        if(coin.set_visible){
        coin.set_visible = false;
        pts += 1;
        score += 1;
        groupArmazenado.push(new Obj(0, 0, 50, 50, "assets/images/saco.png"));
        console.log(groupArmazenado);
        }
        if(groupArmazenado.length === 2){
        groupArmazenado.splice(groupArmazenado.indexOf(armazenado), 1);
        groupArmazenado.push(new Obj(50, 0, 50, 50, "assets/images/saco.png"));
        }
    }
    
    
    if (bird.collide(pipe1) || bird.collide(pipe3) || bird.collide(pipe4)){
        bird.x = 50
        bird.y = 400
        pipe1.y = -500
        pipe3.y = -500
        pipe4.y = -500
        pipe2.y = -500
        pts = 0;
        groupArmazenado = [];
        changeScene(gameover)
    }

    if(groupArmazenado.length === 3){
        groupArmazenado = [];
        changeScene(gameover);
        bird.x = 50
        bird.y = 400
        pipe1.y = -500
        pipe3.y = -500
        pipe4.y = -500
        pipe2.y = -500
        pts = 0
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