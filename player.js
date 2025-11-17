class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 20;
        this.color = "blue";
        this.speed = 5;
        this.lives = 3;
    }

    update() {
        // Player update logic can be added here
        if (keyIsPressed === true) {
            if (key === "ArrowLeft") {
                this.x -= this.speed;
            } else if (key === "ArrowRight") {
                this.x += this.speed;
            }
            // else if (key === "ArrowUp") {
            //     console.log("ss");
            //     return;
            // }
        }
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }
}
