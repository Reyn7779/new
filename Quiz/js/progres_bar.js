// Initialize progress variables
const progressBar = document.getElementById('bar');
let currentQuestion = 0;
const totalQuestions = 5; // Change this to the total number of questions in your quiz

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
}

// Simulating correct answer scenario
function simulateCorrectAnswer() {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        updateProgressBar();
        // Add logic to load the next question here
    } else {
        // Quiz is completed, show the final result
    }
}

// Simulating a correct answer after a delay (for example purposes)
setTimeout(simulateCorrectAnswer, 2000);
