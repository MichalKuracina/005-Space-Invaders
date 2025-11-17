let tileSize = 20;
let enemies = [];
let bombs = [];
let explosions = [];
let shields = [];

function setup() {
    createCanvas(800, 600);

    for (let index = 0; index < 8; index++) {
        enemies.push(new Enemy(index * 60 + 100, 40));
        enemies.push(new Enemy(index * 60 + 100, 100));
        enemies.push(new Enemy(index * 60 + 100, 160));
    }

    addShields();

    // shields.push(new Shield(200, 500));
    // shields.push(new Shield(300, 500));
    // shields.push(new Shield(400, 500));
    // shields.push(new Shield(500, 500));

    // enemies.splice(2, 1);
    // enemies.splice(4, 1);
    // enemies.splice(2, 1);
    // enemies.splice(2, 1);
}

function draw() {
    background(0, 0, 0);
    drawGrid();
    // dropBomb();

    enemies.forEach((enemy) => {
        enemy.update();
        enemy.draw();
    });

    bombs.forEach((bomb) => {
        bomb.update();
        bomb.draw();
    });

    shields.forEach((shield) => {
        shield.update();
        shield.draw();
    });

    explosions.forEach((explosion) => {
        explosion.update();
        explosion.draw();
    });

    explosions = explosions.filter((explosion) => explosion.active);
}

function addShields() {
    let blockStartX = 20;
    let blockStartY = 20;
    let blockColumns = 4;
    let blockRows = 4;
    let shieldSize = 5;

    for (let i = 0; i < blockColumns; i += shieldSize) {
        for (let j = 0; j < blockRows; j += shieldSize) {
            shields.push(
                new Shield(blockStartX + i, blockStartY + j, shieldSize)
            );
        }
    }
}

function dropBomb() {
    if (frameCount % 60 === 0) {
        let randomEnemy = random(enemies);

        if (isLowestRow(randomEnemy)) {
            let bomb = new Bomb(
                randomEnemy.x + randomEnemy.size / 2,
                randomEnemy.y + randomEnemy.size
            );
            bombs.push(bomb); // recursive call to drop another bomb from a different enemy
        } else {
            dropBomb();
        }
    }

    for (let i = bombs.length - 1; i >= 0; i--) {
        if (bombs[i].y >= height) {
            explosions.push(new Explosion(bombs[i].x, bombs[i].y));
            bombs.splice(i, 1);
        }
    }
}

function isLowestRow(thisEnemy) {
    let enemiesInColumn = enemies.filter((enemy) => enemy.x === thisEnemy.x);
    let maxY = Math.max(...enemiesInColumn.map((enemy) => enemy.y));
    return thisEnemy.y === maxY;
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
