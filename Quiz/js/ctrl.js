import { checkWin } from './checkWin';
import { endGame } from './endGame';
import { startTimer } from './startTimer';
import { showFinalScore, showCongratulations, playWinSound, showGameOverScreen, updateTimer } from './displayFunctions';
import { handleTimerExpiration } from './handleTimer';

// Example usage: Call startTimer when you display a new question to start the timer.
startTimer();
