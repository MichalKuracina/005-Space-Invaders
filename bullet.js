class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.color = "yellow";
        this.speed = 7;
    }

    update() {
        this.y -= this.speed;
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.size, this.size * 6);
    }
}
