var canvas = document.getElementById('canvas').getContext("2d");
canvas.imageSmoothingEnabled = false;

document.addEventListener("click", function (e) {
    if (currentScene.click) {
        currentScene.click();
    }
});

var currentScene = {};
function changeScene(scene) {
    currentScene = scene;
}

document.addEventListener("keyup", function (evento) {
    let tecla2 = event.keyCode;
    if (tecla2 == 40) {
        if (pts > 0) {
            pts -= 1;
            if (groupArmazenado.length === 2) {
                groupShoot.push(new Shoot(bird.x + bird.width / bird.x + 30, bird.y + 30, 50, 60, groupArmazenado[1].image));
                groupArmazenado.splice(groupArmazenado.indexOf(armazenado[1]), 1);
            } else {
                groupShoot.push(new Shoot(bird.x + bird.width / bird.x + 30, bird.y + 30, 50, 60, groupArmazenado[0].image));
                groupArmazenado.splice(groupArmazenado.indexOf(armazenado[0]), 1);
            }
            console.log(contador)
        }
    }
});

var pts = 0;
var pts2 = 0;

var contador = 0;
function atualizaContador() {
    if (contador >= 4) {
        contador = 1;
    }
}
console.log(pipe1)
var pipe1 = [new Pipe(600, 500, 96, 358, "assets/images/pipe1.png")];
var pipe2 = new Pipe(600, -500, 96, 358, "assets/images/pipe2.png");
var pipe3 = [new Pipe(1032, 450, 96, 358, "assets/images/pipe2.png")];
var pipe4 = [new Pipe(1642, 400, 96, 358, "assets/images/pipe3.png")];
var pipe5 = [new Pipe(2242, 450, 96, 358, "assets/images/pipe4.png")];
var bird = new Bird(140, 400, 90, 80, "assets/images/bird0.png");

var coin = new Coin(200, 400, 50, 50, "assets/images/saco.png");

var groupArmazenado = [];
var armazenado = {
    draw() {
        groupArmazenado.forEach(armazenado => {
            armazenado.draw()
        })
    }
}

var score = 0;
var score_text = new Text();

var groupShoot = [];
var shoots = {
    draw() {
        groupShoot.forEach(shoot => {
            shoot.draw();
        });
    },

    update() {
        groupShoot.forEach(shoot => {
            shoot.move();

            if (shoot.y >= 650) {
                groupShoot.splice(shoot[0], 1)
            }
        });
    },

}


var infinityBg = {
    bg: new Obj(-1, 0, 1500, 900, "assets/images/sky.png"),
    bg2: new Obj(1, 0, 1500, 900, "assets/images/sky.png"),

    draw() {
        this.bg.draw();
        this.bg2.draw();
    },

    moveBg() {
        this.bg.x += 1;
        this.bg2.x += 1;

        if (this.bg.x >= 1500) {
            this.bg.x = 0;
        }
        if (this.bg2.x >= 0) {
            this.bg2.x = -1500;
        }
    },
}

var infinityGround = {
    ground: new Ground(0, 700, 1500, 200, "assets/images/ground.png"),
    ground2: new Ground(500, 700, 1500, 200, "assets/images/ground.png"),

    draw() {
        this.ground.draw();
        this.ground2.draw();
    },

    moveBg() {
        this.ground.x -= 5;
        this.ground2.x -= 5;

        if (this.ground.x <= -500) {
            this.ground.x = 0;
        }
        if (this.ground2.x <= 0) {
            this.ground2.x = 500;
        }
    },
}


var menu = {
    /*title: new Text("VOA VOA"),
    label: new Text("Clique para jogar"),*/
    clique1: new Obj(340, 180, 500, 500, "assets/images/clique1.png"),

    click() {
        changeScene(game);
    },

    draw() {
        infinityBg.draw();
        bird.draw();
        this.clique1.draw()
        /*this.title.draw_text(60, "Arial", 555, 300, "white");
        this.label.draw_text(20, "Arial", 620, 400, "white");*/
    },

    update() {
        infinityBg.moveBg();
    }

}

var game = {

    draw() {
        infinityBg.draw();
        armazenado.draw();
        pipe1[0].draw();
        pipe3[0].draw();
        pipe4[0].draw();
        pipe5[0].draw()
        infinityGround.draw();
        bird.draw();
        shoots.draw();
        coin.draw();
        score_text.draw_text(60, "OCR A", 540, 60);
    },

    update() {
        infinityGround.moveBg();
        infinityBg.moveBg();

        bird.move();
        bird.animation(18, 3, "bird");
        bird.limits();

        pipe1[0].move(5, -100, 1800, pipe2);
        pipe3[0].move(5, -100, 1800, pipe2);
        pipe4[0].move(5, -100, 1800, pipe2);
        pipe5[0].move(5, -100, 1800, pipe2);

        coin.move(pipe1[0])

        shoots.update();
        atualizaContador();

        score_text.text = score;

        colision();
        acertarCano();
        acertarCano2();
        acertarCano3();
        acertarCano4();
    }
}

var gameover = {
    score: new Text("0"),
    clique2: new Obj(330, 180, 500, 500, "assets/images/clique2.png"),


    draw() {
        infinityBg.draw();
        this.score.draw_text(30, "OCR A", 310, 580);
        this.clique2.draw();
    },

    update() {
        infinityBg.moveBg();
        this.score.update_text("Você fez um total de " + score + " pontos");
    },

    click() {
        changeScene(menu);
        score = 0;
        bullets = 200;
        groupMeteors = [];
        groupShoot = [];
        contador = 0;
        bird.x = 140
        bird.y = 400
        pipe1[0].y = -500
        pipe3[0].y = -500
        pipe4[0].y = -500
        pipe2.y = -500
        pipe5[0].y = -500
        pts = 0;
        groupArmazenado = [];
    }

}


document.addEventListener("keydown", function (evento) {
    let tecla = event.keyCode;
    if (tecla == 38) {
        bird.vel -= 15;
    }
});


function acertarCano() {
    groupShoot.forEach((shoot) => {
        pipe1.forEach((pipe1) => {
            if (shoot.collide(pipe1)) {
                if (shoot.image === "assets/images/saco4.png") {
                    groupShoot.splice(groupShoot.indexOf(shoot), 1);
                    score += 1;
                } else {
                    changeScene(gameover);
                }
            }
        });
    });
}

function acertarCano2() {
    groupShoot.forEach((shoot) => {
        pipe3.forEach((pipe3) => {
            if (shoot.collide(pipe3)) {
                if (shoot.image === "assets/images/saco3.png") {
                    groupShoot.splice(groupShoot.indexOf(shoot), 1);
                    score += 1;
                } else {
                    changeScene(gameover);
                }
            }
        });
    });
}

function acertarCano3() {
    groupShoot.forEach((shoot) => {
        pipe4.forEach((pipe4) => {
            if (shoot.collide(pipe4)) {
                if (shoot.image === "assets/images/saco2.png") {
                    groupShoot.splice(groupShoot.indexOf(shoot), 1);
                    score += 1;
                } else {
                    changeScene(gameover);
                }
            }
        });
    });
}

function acertarCano4() {
    groupShoot.forEach((shoot) => {
        pipe5.forEach((pipe5) => {
            if (shoot.collide(pipe5)) {
                if (shoot.image === "assets/images/saco1.png") {
                    groupShoot.splice(groupShoot.indexOf(shoot), 1);
                    score += 1;
                }
            }
        });
    });
}

function colision() {
    if (bird.collide(coin)) {
        if (coin.set_visible) {
            coin.set_visible = false;
            pts += 1;
            contador += 1;
            groupArmazenado.push(new Obj(20, 20, 50, 60, `assets/images/saco${contador}.png`));
            console.log(groupArmazenado);
        }
        if (groupArmazenado.length === 2) {
            groupArmazenado.splice(groupArmazenado.indexOf(armazenado), 1);
            groupArmazenado.push(new Obj(90, 20, 50, 60, `assets/images/saco${contador}.png`));
        }
    }


    if (bird.collide(pipe1[0]) || bird.collide(pipe3[0]) || bird.collide(pipe4[0]) || bird.collide(pipe5[0])) {
        bird.x = 140
        bird.y = 400
        pipe1[0].y = -500
        pipe3[0].y = -500
        pipe4[0].y = -500
        pipe2.y = -500
        pipe5[0].y = -500
        pts = 0;
        groupArmazenado = [];
        changeScene(gameover)
    }

    if (groupArmazenado.length === 3) {
        groupArmazenado = [];
        changeScene(gameover);
        bird.x = 140
        bird.y = 400
        pipe1[0].y = -500
        pipe3[0].y = -500
        pipe4[0].y = -500
        pipe2.y = -500
        pipe5[0].y = -500
        pts = 0
    }
}

function main() {
    canvas.clearRect(0, 0, 500, 900);
    currentScene.draw();
    currentScene.update();
    requestAnimationFrame(main);
}

changeScene(menu);
main();