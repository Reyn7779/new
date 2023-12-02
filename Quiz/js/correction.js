// Replace this with the actual correct answer for the current question
var correctAnswer = "correctAnswer";

// Function to check the user's answer
function checkAnswer(userAnswer) {
    var answerFeedback = document.getElementById("answer-feedback");
    var answerSound = document.getElementById("answer-sound");

    if (userAnswer === correctAnswer) {
        displayFeedback("Correct", "lime"); // Green for correct
    } else {
        displayFeedback("Incorrect", "red"); // Red for incorrect
    }

    playAnswerSound(answerSound);
}

// Function to display feedback
function displayFeedback(feedbackText, color) {
    var answerFeedback = document.getElementById("answer-feedback");
    answerFeedback.textContent = feedbackText;
    answerFeedback.style.color = color;
}

// Function to play the answer sound
function playAnswerSound(answerSound) {
    answerSound.play();
}

// Example usage:
var userAnswer = "user's answer"; // Replace this with the actual user's answer
checkAnswer(userAnswer);
