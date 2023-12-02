// checkWin.js

function checkWin() {
  if (userScore >= 80) {
    showFinalScore();
    showCongratulations();
    playWinSound();
  }
}
