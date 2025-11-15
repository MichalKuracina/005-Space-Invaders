class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.color = "red";
    }

    update() {
        this.y += 5;
    }

    draw() {
        fill(this.color);
        ellipse(this.x, this.y, this.size);
    }
}
