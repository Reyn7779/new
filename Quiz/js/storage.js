// storage.js

// Check if there's data in sessionStorage
const savedData = sessionStorage.getItem('quizData');

// If there's data, use it to set up your quiz
if (savedData) {
  const parsedData = JSON.parse(savedData);

  // Use parsedData to set up your quiz, for example:
  // Set the current question, score, or any other relevant data

  // Example:
  // const currentQuestion = parsedData.currentQuestion;
  // const score = parsedData.score;
}

// Add an event listener for page unload (refresh/close)
window.addEventListener('unload', function () {
  // Save your current quiz data to sessionStorage
  const quizData = {
    // Store any relevant data here
    // Example:
    // currentQuestion: replaceWithActualValue,
    // score: replaceWithActualValue,
  };

  sessionStorage.setItem('quizData', JSON.stringify(quizData));
});
