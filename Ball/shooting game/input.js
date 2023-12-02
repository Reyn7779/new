// input.js

// Event listeners for paddle and shooting
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

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
