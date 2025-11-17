class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.maxSize = 20;
        this.expansionRate = 5;
        this.active = true;
    }

    update() {
        if (this.size < this.maxSize) {
            this.size += this.expansionRate;
        } else {
            this.active = false;
        }
    }

    draw() {
        fill("orange");
        ellipse(this.x, this.y, this.size);
    }
}
