nextButton.addEventListener("click", () => showNextQuestion());
function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion(questions[currentQuestionIndex]);
    }
  }
  