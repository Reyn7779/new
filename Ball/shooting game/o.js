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
  
  function collisionDetection() {
    for (let c = 0; c < block.colCount; c++) {
      for (let r = 0; r < block.rowCount; r++) {
        let b = blockGrid[c][r];
        if (b.status === 1) {
          if (
            ball.x > b.x &&
            ball.x < b.x + block.width &&
            ball.y > b.y &&
            ball.y < b.y + block.height
          ) {
            ball.dy = -ball.dy;
            b.status = 0;
          }
        }
      }
    }
  }
  