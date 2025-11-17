class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.color = "white";
        this.direction = 1;
        this.step = 0;
    }

    update() {
        if (frameCount % 50 === 0) {
            if (this.step == 4) {
                this.y += this.size;
                this.step = 0;
                this.direction = this.direction * -1;
                return;
            }
            this.x += this.size * this.direction;
            this.step++;
        }
        if (this.y + this.size > height) {
            noloop();
        }
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
    }
}
