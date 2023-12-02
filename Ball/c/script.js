const gun = document.getElementById("gun");
const barrel = document.querySelector(".barrel");
const bullet = document.getElementById("bullet");
const enemiesContainer = document.getElementById("enemies-container");

let gunPosition = { x: window.innerWidth / 2, y: window.innerHeight - 30 };
let isShooting = false;

// Update gun position based on mouse movement
document.addEventListener("mousemove", (event) => {
  gunPosition.x = event.clientX;
  gun.style.left = `${gunPosition.x}px`;
});

// Shooting mechanism (every 0.5 seconds)
setInterval(() => {
  if (isShooting) {
    shoot();
  }
}, 500);

// Function to handle shooting
function shoot() {
  bullet.style.display = "block"; // Show the bullet
  bullet.style.left = `${gunPosition.x - 5}px`; // Center the bullet horizontally
  bullet.style.top = `${gunPosition.y}px`;

  // Move the bullet upwards
  const bulletInterval = setInterval(() => {
    const bulletTop = parseInt(bullet.style.top);
    bullet.style.top = `${bulletTop - 5}px`;

    // Check if the bullet hits any enemy
    if (checkEnemyCollision(bulletTop)) {
      bullet.style.display = "none";
      clearInterval(bulletInterval);
    }

    // Check if the bullet reaches the top
    if (bulletTop <= 0) {
      bullet.style.display = "none";
      clearInterval(bulletInterval);
    }
  }, 20);
}

// Function to check if the bullet hits any enemy
function checkEnemyCollision(bulletTop) {
  const enemies = document.querySelectorAll(".enemy");
  
  for (const enemy of enemies) {
    const enemyTop = parseInt(enemy.style.top);
    const enemyBottom = enemyTop + parseInt(getComputedStyle(enemy).height);

    // Check if the bullet is within the vertical range of the enemy
    if (bulletTop >= enemyTop && bulletTop <= enemyBottom) {
      // Check if the bullet is horizontally aligned with the enemy
      const bulletLeft = parseInt(bullet.style.left);
      const enemyLeft = parseInt(enemy.style.left);
      const enemyRight = enemyLeft + parseInt(getComputedStyle(enemy).width);

      if (bulletLeft >= enemyLeft && bulletLeft <= enemyRight) {
        // If the bullet hits an enemy, destroy the enemy
        enemy.style.display = "none";
        return true;
      }
    }
  }

  return false;
}

// Toggle shooting on mouse click
document.addEventListener("mousedown", () => {
  isShooting = true;
});

document.addEventListener("mouseup", () => {
  isShooting = false;
});

// Function to create enemies
function createEnemy() {
  const enemy = document.createElement("div");
  enemy.className = "enemy";
  enemy.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
  enemy.style.left = `${Math.random() * (window.innerWidth - 50)}px`;

  // Create a gun for the enemy
  const enemyGun = document.createElement("div");
  enemyGun.className = "enemy-gun";
  enemy.appendChild(enemyGun);

  enemiesContainer.appendChild(enemy);

  // Move the enemy periodically
  setInterval(() => {
    moveEnemy(enemy);
  }, 1000);
}

// Function to move an enemy
function moveEnemy(enemy) {
  const enemySpeed = 2;
  const angle = Math.atan2(gunPosition.y - parseInt(enemy.style.top), gunPosition.x - parseInt(enemy.style.left));
  
  const enemyInterval = setInterval(() => {
    const enemyTop = parseInt(enemy.style.top);
    const enemyLeft = parseInt(enemy.style.left);

    const newTop = enemyTop + enemySpeed * Math.sin(angle);
    const newLeft = enemyLeft + enemySpeed * Math.cos(angle);

    enemy.style.top = `${newTop}px`;
    enemy.style.left = `${newLeft}px`;

    // Check if the enemy is close to the player
    if (isCloseToPlayer(enemyTop, enemyLeft)) {
      // If close, make the enemy shoot
      enemyShoot(enemy);
    }
  }, 20);

  // Stop moving after a certain time
  setTimeout(() => {
    clearInterval(enemyInterval);
  }, 5000);
}

// Function to check if the enemy is close to the player
function isCloseToPlayer(enemyTop, enemyLeft) {
  const playerDistance = Math.sqrt(Math.pow(gunPosition.y - enemyTop, 2) + Math.pow(gunPosition.x - enemyLeft, 2));
  return playerDistance < 150; // Adjust the distance as needed
}

// Function for an enemy to shoot
function enemyShoot(enemy) {
  const enemyBullet = document.createElement("div");
  enemyBullet.className = "bullet";
  enemyBullet.style.left = `${parseInt(enemy.style.left) + 10}px`; // Adjust the position based on the enemy's gun
  enemyBullet.style.top = `${parseInt(enemy.style.top) + 10}px`; // Adjust the position based on the enemy's gun
  document.body.appendChild(enemyBullet);

  // Move the enemy bullet upwards
  const enemyBulletInterval = setInterval(() => {
    const enemyBulletTop = parseInt(enemyBullet.style.top);
    enemyBullet.style.top = `${enemyBulletTop + 5}px`;

    // Check if the enemy bullet hits the player
    if (checkPlayerCollision(enemyBulletTop)) {
      enemyBullet.style.display = "none";
      clearInterval(enemyBulletInterval);
    }

    // Check if the enemy bullet reaches the top
    if (enemyBulletTop >= window.innerHeight) {
      enemyBullet.style.display = "none";
      clearInterval(enemyBulletInterval);
    }
  }, 20);
}

// Function to check if the enemy bullet hits the player
function checkPlayerCollision(enemyBulletTop) {
  const playerBottom = gunPosition.y;

  // Check if the enemy bullet is within the vertical range of the player
  return enemyBulletTop <= playerBottom;
}

// Create enemies periodically
setInterval(() => {
  createEnemy();
}, 5000);
