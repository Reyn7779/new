const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');

const blockRows = 3;
const blockCols = 5;
const blockWidth = 60;
const blockHeight = 20;
const blockPadding = 10;
const blockOffsetTop = 30;
const blockOffsetLeft = 30;

const blocks = [];

for (let col = 0; col < blockCols; col++) {
    blocks[col] = [];
    for (let row = 0; row < blockRows; row++) {
        blocks[col][row] = { x: 0, y: 0, status: 1 };
    }
}

function drawBlocks() {
    for (let col = 0; col < blockCols; col++) {
        for (let row = 0; row < blockRows; row++) {
            if (blocks[col][row].status === 1) {
                const blockX = col * (blockWidth + blockPadding) + blockOffsetLeft;
                const blockY = row * (blockHeight + blockPadding) + blockOffsetTop;

                // Draw the block
                context.beginPath();
                context.rect(blockX, blockY, blockWidth, blockHeight);
                context.fillStyle = '#0095DD';
                context.fill();
                context.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (let col = 0; col < blockCols; col++) {
        for (let row = 0; row < blockRows; row++) {
            const b = blocks[col][row];
            if (b.status === 1) {
                if (
                    ballX > b.x &&
                    ballX < b.x + blockWidth &&
                    ballY > b.y &&
                    ballY < b.y + blockHeight
                ) {
                    ballSpeedY = -ballSpeedY;
                    b.status = 0; // Mark the block as destroyed
                    score++;
                    scoreDisplay.textContent = `Score: ${score}`;
                    if (score === blockRows * blockCols) {
                        alert('Congratulations! You win!');
                        resetGame();
                    }
                }
            }
        }
    }
}

function resetBlocks() {
    for (let col = 0; col < blockCols; col++) {
        blocks[col] = [];
        for (let row = 0; row < blockRows; row++) {
            blocks[col][row] = { x: 0, y: 0, status: 1 };
        }
    }
}

resetBlocks();
