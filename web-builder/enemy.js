// enemy.js
const enemyCanvas = document.getElementById('enemyCanvas');
const enemyCtx = enemyCanvas.getContext('2d');

class Enemy {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        enemyCtx.fillStyle = this.color;
        enemyCtx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Example enemy creation
const exampleEnemy = new Enemy(50, 50, 30, 30, 'red');
exampleEnemy.draw();
