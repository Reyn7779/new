const gameContainer = document.getElementById('game-container');
const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');
const scoreDisplay = document.getElementById('score');
const countdownDisplay = document.getElementById('countdown');

let ballX = 200;
let ballY = 150;
let ballSpeedX = 2;
let ballSpeedY = 2;
let paddleX = 160;
let score = 0;
let countdown = 3;

function updateGame() {
    // Countdown before starting the game
    if (countdown > 0) {
        countdownDisplay.textContent = countdown;
        setTimeout(() => {
            countdown--;
            requestAnimationFrame(updateGame);
        }, 1000);
    } else {
        countdownDisplay.style.display = 'none';

        // Update ball position
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Bounce off walls
        if (ballX < 0 || ballX > gameContainer.clientWidth - 20) {
            ballSpeedX = -ballSpeedX;
        }
        if (ballY < 0) {
            ballSpeedY = -ballSpeedY;
        }

        // Bounce off paddle
        if (
            ballY > gameContainer.clientHeight - 20 &&
            ballX > paddleX &&
            ballX < paddleX + 80
        ) {
            // Check if the ball hits the top part of the paddle
            if (ballY < gameContainer.clientHeight - 15) {
                ballSpeedY = -ballSpeedY;
                // Increase score when the ball hits the paddle
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            } else {
                ballSpeedX = -ballSpeedX;
            }
        }

        // Game over if ball hits the bottom
        if (ballY > gameContainer.clientHeight) {
            alert(`Game Over! Your Score: ${score}`);
            resetGame();
        }

        // Update ball position in the DOM
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';

        requestAnimationFrame(updateGame);
    }
}

function movePaddle(event) {
    // Move paddle with mouse
    paddleX = event.clientX - gameContainer.offsetLeft - 40; // Center the paddle under the mouse

    // Ensure the paddle stays within the game container
    if (paddleX < 0) {
        paddleX = 0;
    } else if (paddleX > gameContainer.clientWidth - 80) {
        paddleX = gameContainer.clientWidth - 80;
    }

    // Update paddle position in the DOM
    paddle.style.left = paddleX + 'px';
}

function resetGame() {
    ballX = 200;
    ballY = 150;
    paddleX = 160;
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    countdown = 3;
    countdownDisplay.style.display = 'block';
    requestAnimationFrame(updateGame);
}

document.addEventListener('mousemove', movePaddle);

// Start the game loop
requestAnimationFrame(updateGame);
