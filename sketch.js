let tileSize = 20;
let enemies = [];
let bombs = [];
let explosions = [];
let shields = [];
let player;
let bullets = [];

async function setup() {
    let spritesheet = await loadImage("assets/invaders.png");
    let spritesCollection = {
        invader1: spritesheet.get(0, 0, 280, 185),
        invader2: spritesheet.get(330, 0, 220, 195),
        invader3: spritesheet.get(25, 291, 225, 180),
    };

    createCanvas(800, 600);

    for (let index = 0; index < 8; index++) {
        enemies.push(
            new Enemy(index * 60 + 100, 40, 4, spritesCollection.invader1)
        );
        enemies.push(
            new Enemy(index * 60 + 100, 100, 3, spritesCollection.invader2)
        );
        enemies.push(
            new Enemy(index * 60 + 100, 160, 2, spritesCollection.invader3)
        );
    }

    addShields();

    player = new Player(width / 2 - 60, height - 20);
}

function draw() {
    background(0, 0, 0);
    // drawGrid();
    dropBomb();

    enemies.forEach((enemy) => {
        enemy.update();
        enemy.draw();
    });

    bombs.forEach((bomb) => {
        bomb.update();
        bomb.draw();
    });

    bullets.forEach((bullet) => {
        bullet.update();
        bullet.draw();
    });

    checkCollisions();

    shields.forEach((shield) => {
        shield.draw();
    });

    explosions.forEach((explosion) => {
        explosion.update();
        explosion.draw();
    });

    explosions = explosions.filter((explosion) => explosion.active);

    player.update();
    player.draw();

    updateScore();
}

function updateScore() {
    if (player.lives <= 0) {
        noLoop();
        fill("red");
        textSize(32);
        textAlign(CENTER);
        text("Game Over", width / 2, height / 2);
        return;
    }

    if (enemies.length === 0) {
        noLoop();
        fill("green");
        textSize(32);
        textAlign(CENTER);
        text("You Win!", width / 2, height / 2);
        return;
    }

    fill("white");
    textSize(16);
    textAlign(LEFT);
    text("Lives: " + player.lives, 10, 20);
    text("Enemies Left: " + enemies.length, 10, 40);
}

function keyPressed() {
    if (key === "ArrowUp") {
        bullets.push(new Bullet(player.x + player.width / 2, player.y));
    }
}

function checkCollisions() {
    for (let i = bombs.length - 1; i >= 0; i--) {
        for (let j = shields.length - 1; j >= 0; j--) {
            // bombs vs shields
            if (
                bombs[i].x >= shields[j].x &&
                bombs[i].x <= shields[j].x + shields[j].width &&
                bombs[i].y + bombs[i].size > shields[j].y &&
                bombs[i].y < shields[j].y + shields[j].height
            ) {
                explosions.push(new Explosion(bombs[i].x, bombs[i].y));
                bombs.splice(i, 1);
                shields.splice(j, 1);
                return;
            }
        }

        // bomb vs groud
        if (bombs[i].y >= height) {
            explosions.push(new Explosion(bombs[i].x, bombs[i].y));
            bombs.splice(i, 1);
            return;
        }

        // bomb vs player
        if (
            bombs[i].y >= player.y &&
            bombs[i].y <= player.y + player.height &&
            bombs[i].x >= player.x &&
            bombs[i].x <= player.x + player.width
        ) {
            explosions.push(new Explosion(bombs[i].x, bombs[i].y));
            bombs.splice(i, 1);
            player.lives -= 1;
            return;
        }
    }

    for (let k = bullets.length - 1; k >= 0; k--) {
        for (let l = enemies.length - 1; l >= 0; l--) {
            // bullet vs enemy
            if (
                bullets[k].y <= enemies[l].y + enemies[l].size &&
                bullets[k].y >= enemies[l].y &&
                bullets[k].x >= enemies[l].x &&
                bullets[k].x <= enemies[l].x + enemies[l].size
            ) {
                explosions.push(new Explosion(bullets[k].x, bullets[k].y));
                enemies[l].health -= 1;
                if (enemies[l].health <= 0) {
                    enemies.splice(l, 1);
                }
                bullets.splice(k, 1);
                return;
            }
        }

        for (let m = shields.length - 1; m >= 0; m--) {
            // bullets vs shields
            if (
                bullets[k].x >= shields[m].x &&
                bullets[k].x <= shields[m].x + shields[m].width &&
                bullets[k].y + bullets[k].size > shields[m].y &&
                bullets[k].y < shields[m].y + shields[m].height
            ) {
                explosions.push(new Explosion(bullets[k].x, bullets[k].y));
                bullets.splice(k, 1);
                shields.splice(m, 1);
                return;
            }
        }

        // bullet vs ceiling
        if (bullets[k].y <= 0) {
            explosions.push(new Explosion(bullets[k].x, bullets[k].y));
            bullets.splice(k, 1);
            return;
        }
    }

    // bomb vs bullet
    for (let n = bombs.length - 1; n >= 0; n--) {
        for (let p = bullets.length - 1; p >= 0; p--) {
            if (
                bullets[p].x >= bombs[n].x - bombs[n].size && // make bombs easier to hit
                bullets[p].x <= bombs[n].x + bombs[n].size * 2 && // make bombs easier to hit
                bullets[p].y <= bombs[n].y + bombs[n].size &&
                bullets[p].y >= bombs[n].y
            ) {
                explosions.push(new Explosion(bullets[p].x, bullets[p].y));
                bombs.splice(n, 1);
                bullets.splice(p, 1);
                return;
            }
        }
    }
}

function addShields() {
    let blockStartX = 0;
    let blockStartY = 440;
    let blockColumns = 16;
    let blockRows = 6;
    let shieldSize = 5;
    let shieldNumber = 4;
    let shieldGap = 150;

    for (let n = 0; n < shieldNumber; n++) {
        blockStartX = blockStartX + shieldGap;
        for (let i = 0; i < blockColumns * shieldSize; i += shieldSize) {
            for (let j = 0; j < blockRows * shieldSize; j += shieldSize) {
                shields.push(
                    new Shield(blockStartX + i, blockStartY + j, shieldSize)
                );
            }
        }
    }
}

function dropBomb() {
    if (frameCount % 35 === 0) {
        let randomEnemy = random(enemies);
        // randomEnemy = enemies[5]; // for testing purposes
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
