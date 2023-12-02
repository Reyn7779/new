const backButton = document.getElementById("back-button");

backButton.addEventListener("click", () => showPreviousQuestion());
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(questions[currentQuestionIndex]);
    }
  }
  