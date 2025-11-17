class Shield {
    constructor(x, y, shieldSize) {
        this.x = x;
        this.y = y;
        this.width = shieldSize;
        this.height = shieldSize;
        this.color = "green";
    }

    update() {
        // Shield update logic can be added here
    }

    draw() {
        // console.log(this.x);
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }
}
