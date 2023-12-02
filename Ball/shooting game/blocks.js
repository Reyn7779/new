// game.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ball properties
let ball = { x: canvas.width / 2, y: canvas.height - 30, radius: 10, dx: 0, dy: -2, shooting: false };

// Paddle properties
let paddle = { width: 75, height: 10, x: (canvas.width - 75) / 2 };

// Gun properties
let gun = { width: 10, height: 30, x: canvas.width / 2 - 5, y: canvas.height - 40 };

// Event listeners for paddle and shooting
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

// Create the block grid
let blockGrid = [];
for (let c = 0; c < block.colCount; c++) {
  blockGrid[c] = [];
  for (let r = 0; r < block.rowCount; r++) {
    blockGrid[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  } else if (e.key === " ") {
    spacePressed = true;
    if (!ball.shooting) {
      ball.shooting = true;
      ball.dx = 0;
      ball.dy = -5;
    }
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  } else if (e.key === " ") {
    spacePressed = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBlock();
  drawBall();
  drawPaddle();
  drawGun();

  collisionDetection();

  // Ball shooting
  if (ball.shooting) {
    ball.y += ball.dy;
    if (ball.y < 0) {
      ball.shooting = false;
      ball.y = canvas.height - 30;
      ball.dy = -2;
    }
  } else {
    ball.x = paddle.x + paddle.width / 2;
    ball.y = canvas.height - 30;
  }

  // Paddle movement
  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.x += 7;
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= 7;
  }

  // Gun movement
  if (spacePressed) {
    gun.x = paddle.x + (paddle.width - gun.width) / 2;
  }

  requestAnimationFrame(draw);
}

draw();
