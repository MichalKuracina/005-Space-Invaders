let tileSize = 20;
let enemies = [];
let bombs = [];

function setup() {
    createCanvas(800, 600);

    for (let index = 0; index < 8; index++) {
        enemies.push(new Enemy(index * 60 + 100, 40));
    }
}

function draw() {
    background(0, 0, 0);
    drawGrid();
    dropBomb();

    enemies.forEach((enemy) => {
        enemy.update();
        enemy.draw();
    });

    bombs.forEach((bomb) => {
        bomb.update();
        bomb.draw();
    });
}

function dropBomb() {
    if (frameCount % 60 === 0) {
        let randomEnemy = random(enemies);
        let bomb = new Bomb(
            randomEnemy.x + randomEnemy.size / 2,
            randomEnemy.y + randomEnemy.size
        );
        bombs.push(bomb);
    }
}

function drawGrid() {
    for (let x = 0; x < width; x += tileSize) {
        stroke("white");
        strokeWeight(0.5);
        line(x, 0, x, height);
    }

    for (let y = 0; y < height; y += tileSize) {
        stroke("white");
        strokeWeight(0.5);
        line(0, y, width, y);
    }
}
