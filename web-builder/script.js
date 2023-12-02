const canvas = document.getElementById('stickmanCanvas');
const ctx = canvas.getContext('2d');

const stickman = {
    x: 50,
    y: canvas.height - 30,
    width: 20,
    height: 30,
    color: '#000'
};

const gun = {
    x: stickman.x + stickman.width / 2 - 5,
    y: stickman.y - stickman.height - 10,
    width: 10,
    height: 10,
    color: '#333'
};

const bullets = [];

function drawStickman() {
    ctx.fillStyle = stickman.color;
    ctx.fillRect(stickman.x, stickman.y - stickman.height, stickman.width, stickman.height); // Body
    ctx.fillRect(stickman.x - 5, stickman.y - stickman.height - 20, stickman.width + 10, 10); // Head
    ctx.fillRect(stickman.x, stickman.y, 5, 20); // Legs
    ctx.fillRect(stickman.x + stickman.width - 5, stickman.y, 5, 20); // Legs
}

function drawGun() {
    ctx.fillStyle = gun.color;
    ctx.fillRect(gun.x, gun.y, gun.width, gun.height);
}

function drawBullets() {
    ctx.fillStyle = '#FF0000'; // Red color for bullets
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    clearCanvas();
    drawStickman();
    drawGun();
    drawBullets();
}

function moveStickman(event) {
    stickman.x = event.clientX - canvas.getBoundingClientRect().left - stickman.width / 2;
    gun.x = stickman.x + stickman.width / 2 - gun.width / 2;
    update();
}

function shootBullet() {
    bullets.push({
        x: gun.x + gun.width / 2 - 2,
        y: gun.y,
        width: 4,
        height: 10,
        speed: 5 // Adjust bullet speed
    });
}

function handleMouseClick(event) {
    if (event.button === 0) {
        // Left mouse button clicked
        shootBullet();
    }
}

function handleScroll(event) {
    // Detect scroll direction
    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    
    if (delta > 0) {
        // Scrolling up, shoot a bullet
        shootBullet();
    }
}

function moveBullets() {
    bullets.forEach(bullet => {
        bullet.y -= bullet.speed;

        // Remove bullets that go off-screen
        if (bullet.y + bullet.height < 0) {
            bullets.splice(bullets.indexOf(bullet), 1);
        }
    });
}

function gameLoop() {
    moveBullets();
    update();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('mousemove', moveStickman);
document.addEventListener('mousedown', handleMouseClick);
document.addEventListener('wheel', handleScroll);
gameLoop(); // Start the game loop
