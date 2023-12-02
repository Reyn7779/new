// displayFunctions.js

function showFinalScore() {
    document.getElementById('final-score').textContent = 'Your Score: ' + userScore;
  }
  
  function showCongratulations() {
    document.getElementById('congratulations').style.display = 'block';
  }
  
  function playWinSound() {
    document.getElementById('win-sound').play();
  }
  
  function showGameOverScreen() {
    document.getElementById('game-over').style.display = 'block';
  }
  
  function updateTimer(time) {
    document.getElementById('countdown').textContent = time;
  }
  