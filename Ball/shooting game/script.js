const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ball properties
let ball = { x: canvas.width / 2, y: canvas.height - 30, radius: 10, dx: 0, dy: -2, shooting: false };

// Paddle properties
let paddle = { width: 75, height: 10, x: (canvas.width - 75) / 2 };

// Gun properties
let gun = { width: 10, height: 30, x: canvas.width / 2 - 5, y: canvas.height - 70, isDragging: false };

// Block properties
let block = { width: 75, height: 20, rowCount: 5, colCount: 5, padding: 10 };

// Event listeners for paddle and shooting
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
canvas.addEventListener("mousemove", mouseMoveHandler);
canvas.addEventListener("mousedown", mouseDownHandler);
canvas.addEventListener("mouseup", mouseUpHandler);
canvas.addEventListener("click", mouseClickHandler);

let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

let mouseX = 0;

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
  } else if (e.code === "Space") {
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
  } else if (e.code === "Space") {
    spacePressed = false;
  }
}

function mouseMoveHandler(e) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;
  mouseX = e.clientX - rect.left - root.scrollLeft;

  if (gun.isDragging) {
    gun.x = mouseX - gun.width / 2;
  }
}

function mouseDownHandler(e) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;
  mouseX = e.clientX - rect.left - root.scrollLeft;

  // Check if the mouse click is on the gun
  if (mouseX > gun.x && mouseX < gun.x + gun.width && e.clientY > gun.y && e.clientY < gun.y + gun.height) {
    gun.isDragging = true;
  }
}

function mouseUpHandler() {
  gun.isDragging = false;
}

function mouseClickHandler() {
  if (!ball.shooting) {
    ball.shooting = true;
    ball.dx = 0;
    ball.dy = -5;
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

  requestAnimationFrame(draw);
}

function collisionDetection() {
  for (let c = 0; c < block.colCount; c++) {
    for (let r = 0; r < block.rowCount; r++) {
      let b = blockGrid[c][r];
      if (b.status === 1) {
        // Check if the ball intersects with a block
        if (
          ball.x + ball.radius > b.x &&
          ball.x - ball.radius < b.x + block.width &&
          ball.y + ball.radius > b.y &&
          ball.y - ball.radius < b.y + block.height
        ) {
          ball.dy = -ball.dy; // Reverse the ball's vertical direction
          b.status = 0; // Set the block's status to 0 (destroyed)
        }
      }
    }
  }
}

  // Paddle movement
  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.x += 7;
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= 7;
  }

  requestAnimationFrame(draw);

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawGun() {
  ctx.beginPath();
  ctx.rect(gun.x, gun.y, gun.width, gun.height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBlock() {
  for (let c = 0; c < block.colCount; c++) {
    for (let r = 0; r < block.rowCount; r++) {
      if (blockGrid[c][r].status === 1) {
        let x = c * (block.width + block.padding) + block.padding;
        let y = r * (block.height + block.padding) + block.padding;
        blockGrid[c][r].x = x;
        blockGrid[c][r].y = y;
        ctx.beginPath();
        ctx.rect(x, y, block.width, block.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

draw();
